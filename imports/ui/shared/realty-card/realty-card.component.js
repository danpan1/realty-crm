/**
 * Created by Danpan on 10.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../helpers/dictionary';
import {Meteor} from 'meteor/meteor';
import {Realty} from '../../../api/realty';
import {name as Conditions} from '../conditions/conditions.component';

import './realty-card.view.html';

class RealtyCard {
  /* @ngInject */
  constructor($scope, $reactive, $mdDialog, $timeout) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.timeout = $timeout;
    this.show = true;
    this.mdDialog = $mdDialog;
    var vm = this;

    if(this.realty.status == 'taken') this.realtyIsTaken = true;
    if (this.user) {
      this.data = {
        good_name: "ocaen_object_6mes",
        bill_first_name: this.user.profile.name,
        bill_email: this.user.emails[0].address,
        bill_phone: this.user.profile.phone,
        file_profile: "default",
        offerta_accept: "true"
      };
    }
    this.checkUserPaid(false);
    this.close = function () {
      this.mdDialog.cancel();
    };

  }

  agency() {
    this.isAgent = true;
    console.log('oceanBanAgency', this.realtyPhone, this.realtyName);
    Meteor.call('oceanBanAgency', this.realtyPhone, this.realtyName);
  }

  coolImage() {
    var img = new Image();
    img.src = this.realty.image;
    this.timeout(()=> {
      if (img.height < 10 || !this.realty.details.images[0] || !this.realty.details.images[0].url) {
        this.noPhoto = true;
      }
    });
  }

  agentContinue(id) {
    if (id) {
      this.objectAdded = true;
    }
    else {
      this.show = false;
    }
  }

  changeRelationType(type, realtyId, clientId, isNew) {
    Meteor.call('changeRelationTypeInClient', type, realtyId, clientId, isNew);
  }

  /**
   *
   * @param ev - event
   * @param type - Arenda or Sale
   */
  openPurchaseStart(ev, type) {
    let saleOrArenda = '', operation = '', amount = '';
    console.log('this.realty.type', this.realty.type);
    if(this.realty.type === 1){
      saleOrArenda = 'sale';
      operation = 'Продажу';
      amount = '1440';
    } else {
      saleOrArenda = 'arenda';
      operation = 'Аренду';
      amount = '990';
    }
    const vm = this;
    this.mdDialog.show({
      //controller: DialogController,
      template: `<md-dialog class="subscription-dialog" aria-label="Оплата подписки" ng-cloak>
                    <md-toolbar>
                      <div class="md-toolbar-tools">
                        <h2>Оплата «Океан объектов»</h2>
                        <span flex></span>
                        <md-button class="md-icon-button" ng-click="this.close()">
                          <!--<md-icon md-svg-src="svg/icon-close.svg" aria-label="Закрыть окно оплаты подписки"></md-icon>-->
                        </md-button>
                      </div>
                    </md-toolbar>
                    <md-dialog-content>
                      <div class="md-dialog-content pv-16">
                        <div layout="column">
                          <div layout="row" flex="80">
                            <h3 class="md-subhead text-center">Безлимитное количество объектов</h3>
                          </div>
                          <form id="__cmsform_order" role="form" method="POST" action="http://ariusbiz.justclick.ru/order/confirm/ocean_object_${saleOrArenda}_1mes/" target='blank' onsubmit="return __cmsformcheck_order()">
                            <input type="hidden" name="good_name" value="ocean_object_${saleOrArenda}_1mes" />
                            <input type="hidden" name="bill_first_name" value="${this.data.bill_first_name}" />
                            <input type="hidden" name="bill_email" value="${this.data.bill_email}" />
                            <input type="hidden" name="bill_phone" value="${this.data.bill_phone}" />
                            <input type="hidden" name="offerta_accept" checked="${this.data.offerta_accept}" />
                            <div layout="row">
                              <md-button flex class=" md-raised mv-16 ph-16">
                                <input type="submit" value="подписаться на ${operation} за ${amount}&#8381; в месяц" name="doorder" class="feedback__nostyles" style='color:black;' />
                              </md-button>
                          </form>
                        </div>
                        <form id="__cmsform_order" role="form" method="POST" action="http://ariusbiz.justclick.ru/order/confirm/ocean_object_${saleOrArenda}_6mes/" target='blank' onsubmit="return __cmsformcheck_order()">
                          <input type="hidden" class="good-name" name="good_name" value="ocean_object_${saleOrArenda}_6mes" />
                          <input type="hidden" name="bill_first_name" value="${this.data.bill_first_name}" />
                          <input type="hidden" name="bill_email" value="${this.data.bill_email}" />
                          <input type="hidden" name="bill_phone" value="${this.data.bill_phone}" />
                          <input type="hidden" name="offerta_accept" checked="${this.data.offerta_accept}" />
                          <div layout="row">
                            <md-button flex class="md-primary md-raised mv-16 ph-16 flex">
                              <input type="submit" value="оплатить ${operation} за 6 месяцев со скидкой 25%" name="doorder"  class="feedback__nostyles" />
                            </md-button>
                          </div>
                        </form>
                        <form id="__cmsform_order" role="form" method="POST" action="http://ariusbiz.justclick.ru/order/confirm/ocean_object_arenda_sale_1mes/" target='blank' onsubmit="return __cmsformcheck_order()">
                          <input type="hidden" class="good-name" name="good_name" value="ocean_object_arenda_sale_1mes" />
                          <input type="hidden" name="bill_first_name" value="${this.data.bill_first_name}" />
                          <input type="hidden" name="bill_email" value="${this.data.bill_email}" />
                          <input type="hidden" name="bill_phone" value="${this.data.bill_phone}" />
                          <input type="hidden" name="offerta_accept" checked="${this.data.offerta_accept}" />
                          <div layout="row">
                            <md-button flex class="md-warn md-raised mv-16 ph-16 flex">
                              <input type="submit" value="подписаться на  аренду и продажу за 1 880Р в месяц со скидкой 25%" name="doorder" class="feedback__nostyles" />
                            </md-button>
                          </div>
                        </form>
                        <form id="__cmsform_order" role="form" method="POST" action="http://ariusbiz.justclick.ru/order/confirm/ocean_object_arenda_sale_6mes/" target='blank' onsubmit="return __cmsformcheck_order()">
                          <input type="hidden" class="good-name" name="good_name" value="ocean_object_arenda_sale_6mes" />
                          <input type="hidden" name="bill_first_name" value="${this.data.bill_first_name}" />
                          <input type="hidden" name="bill_email" value="${this.data.bill_email}" />
                          <input type="hidden" name="bill_phone" value="${this.data.bill_phone}" />
                          <input type="hidden" name="offerta_accept" checked="${this.data.offerta_accept}" />
                          <div layout="row">
                            <md-button flex class="md-warn md-raised mv-16 ph-16 flex">
                              <input type="submit" value="оплатить аренду и продажу за 6 месяцев со скидкой 50%" name="doorder" class="feedback__nostyles" />
                            </md-button>
                          </div>
                        </form>
                        
                      </div>
                    </md-dialog-content>
                </md-dialog>`,
      targetEvent: ev,
      clickOutsideToClose: true
    })
  }
  
  onShowDetails () {
    if(!this.realtyPhone){
      let vm = this;
      this.loadingDetails = true;
      let realtyId = this.realty._id;
      let userId = this.user._id;
      Meteor.call('showRealtyDetails', realtyId, userId, (err, result)=> {
        if (err) {
          console.log('err: ' + err);
        } else {
          console.log(result);
          this.timeout(()=> {
            vm.realtyPhone = result.phone;
            vm.realtyName = result.name;
            vm.realtyStreet = result.address.street;
            vm.realtyHouse = result.address.house;
            this.loadingDetails = false;
            this.ngShowDescr = true;
          }, 0);
        }
      });
    }else{
      this.ngShowDescr = !this.ngShowDescr;
    }
  }
  
  checkUserPaid (ev) {
    this.isUserPaid = false;

    if (this.user && this.user.roles){
      if(this.user.roles.indexOf('paid') !== -1 && this.realty.type === 4) {
        this.isUserPaid = true;
      }
      if(this.user.roles.indexOf('paidSale') !== -1 && this.realty.type === 1) {
        this.isUserPaid = true;
      }
    }

    if (!this.isUserPaid && ev) {
      this.openPurchaseStart(ev);
      return false;
    } 
    else return true;
  }
  
  takeRealty(id, ev) {
    let vm = this;
    
    if(this.checkUserPaid(ev)){
      Meteor.call('takeRealty', id, (err, result)=> {
        if (err) {
          console.log('err: ' + err);
        } else {
          console.log(result);
          this.timeout(()=> {
            vm.realtyPhone = result.phone;
            vm.realtyName = result.name;
            vm.realtyStreet = result.address.street;
            vm.realtyHouse = result.address.house;
          }, 0);
        }
      });
    }
  }

  takeCheckedRealty(id, status) {
    Meteor.call('takeRealty', id, status, (err, result)=> {
      if (err) {
        console.log('err: ' + err);
      } else {
        console.log(result);
      }
    });
  }

  sendRealtyRelation(realtyId, clientId) {
    let vm = this;
    console.log(realtyId, 'realtyId');
    console.log(this.clientId, 'clientId');
    Meteor.call('setRelationFindRealty', this.clientId, realtyId, this.realtylisttype);
  }

  updateRealty(id) {
    Realty.update({_id: id}, {
      $set: this.realty
    }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('call recieved newObj');
      }
    });
  }
  
  onShowPhone (realtyId, ev) {
    if(!this.shownPhone){
      if(this.checkUserPaid(ev)){
        Meteor.call('takeRealty', realtyId, (err, result)=> {
          if (err) {
            console.log('err: ' + err);
          } else {
            console.log(result);
            this.shownPhone = result.phone;
          }
        });
      }
    }
  }

  showSlider () {
    if (!this.noPhoto) {
      this.slider({'images': this.realty.details.images});
    }
  }
}

function DialogController($scope, $reactive, $mdDialog) {
  $reactive(this).attach($scope);
  this.close = function () {
    this.mdDialog.cancel();
  };
}

const moduleName = 'realtyCard';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  Conditions
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/realty-card/realty-card.view.html',
  bindings: {
    realty: '<',
    slider: '&',
    relationType: '@',
    clientId: '<',
    realtylisttype: '@',
    user: '<'
  },
  controllerAs: moduleName,
  controller: RealtyCard
});
