/**
 * Created by Danpan on 10.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../helpers/dictionary';
import {Meteor} from 'meteor/meteor';
import {Realty} from '../../../api/realty';

import './realty-card.view.html';

class RealtyCard {
  /* @ngInject */
  constructor($scope, $reactive, $mdDialog, $timeout, $http) {
    $reactive(this).attach($scope);
    this.http = $http;
    this.dictionary = dictionary;
    this.timeout = $timeout;
    this.show = true;
    this.mdDialog = $mdDialog;
    var vm = this;

    if (this.user) {
      vm.data = {
        good_name: "ocaen_object_6mes",
        bill_first_name: this.user.profile.name,
        bill_email: this.user.emails[0].address,
        bill_phone: this.user.profile.phone,
        file_profile: "default",
        offerta_accept: "true"
      };
    }

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

  openPurchaseStart(ev) {
    var vm = this;
    this.mdDialog.show({
      //controller: DialogController,
      template: `<md-dialog class="subscription-dialog" aria-label="Оплата подписки" ng-cloak>
                    <md-toolbar>
                      <div class="md-toolbar-tools">
                        <h2>Оплата подписки</h2>
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
                            <h3 class="md-subhead text-center">Безлимитное количество объектов за 990 рублей в месяц</h3>
                          </div>
                          <form id="__cmsform_order" role="form" method="POST" action="http://ariusbiz.justclick.ru/order/confirm/ocaen_object_period/?t=20985#form" target='blank' onsubmit="return __cmsformcheck_order()">
                            <input type="hidden" name="good_name" value="ocaen_object_period" />
                            <input type="hidden" name="bill_first_name" value="${this.data.bill_first_name}" />
                            <input type="hidden" name="bill_email" value="${this.data.bill_email}" />
                            <input type="hidden" name="bill_phone" value="${this.data.bill_phone}" />
                            <input type="hidden" name="offerta_accept" checked="${this.data.offerta_accept}" />
                            <div layout="row">
                              <md-button flex class="md-primary md-raised mv-16 ph-16">
                                <input type="submit" value="Оплатить картой подписку на 1 месяц" name="doorder" class="feedback__nostyles" />
                              </md-button>
                          </form>
                        </div>
                          <form id="__cmsform_order" role="form" method="POST" action="http://ariusbiz.justclick.ru/order/confirm/ocaen_object_6mes/?t=20986#form" target='blank' onsubmit="return __cmsformcheck_order()">
                            <input type="hidden" class="good-name" name="good_name" value="ocaen_object_6mes" />
                            <input type="hidden" name="bill_first_name" value="${this.data.bill_first_name}" />
                            <input type="hidden" name="bill_email" value="${this.data.bill_email}" />
                            <input type="hidden" name="bill_phone" value="${this.data.bill_phone}" />
                            <input type="hidden" name="offerta_accept" checked="${this.data.offerta_accept}" />
                            <div layout="row">
                              <md-button flex class="md-default md-raised mv-16 ph-16 flex">
                                <input type="submit" value="Оплатить другой системой за 6 месяцев" name="doorder" style='color:black;' class="feedback__nostyles" />
                              </md-button>
                          </form>
                          <!--<md-button class="md-danger md-raised" ng-click='close()'>Закрыть!</md-button>-->
                        
                      </div>
                    </md-dialog-content>
                </md-dialog>`,
      targetEvent: ev,
      clickOutsideToClose: true
    })
  }

  takeRealty(id, ev) {
    let vm = this;
    this.isUserPaid = false;

    if (this.user && this.user.roles && (this.user.roles.indexOf('paid') !== -1)) {
      this.isUserPaid = true;
    }

    if (!this.isUserPaid) {
      this.openPurchaseStart(ev);
    }
    else {
      Meteor.call('takeRealty', id, (err, result)=> {
        if (err) {
          console.log('err: ' + err);
        } else {
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

  sendRealtyRelation(realtyId) {
    let vm = this;
    console.log(realtyId, 'realtyId');
    console.log(this.clientId, 'clientId');
    Meteor.call('setRelationFindRealty', this.clientId, realtyId, this.realtylisttype);
    
    
    Meteor.call('takeRealty', realtyId, (err, result)=> {
      if (err) {
        console.log('err: ' + err);
      } else {
        this.timeout(()=> {
          
          let sms = {
            name: result.name,
            realtorPhone: '79250759587' || '7'+result.phone.slice(1),
            street: result.address.street,
            house: result.address.house,
            phone:vm.data.bill_phone
          };
          
          let text = sms.realtorPhone + '&text=' + sms.name + ', у меня есть клиенты на ваш объект ' + sms.street + ', ' + sms.house + '. Мой номер: ' + sms.phone + '. Ваше объявление нашел на сайте миринедвижимость.рф';
          console.log(text);
          
          Meteor.call('sendSms', text, (err, result)=> {
            if (err) {
              console.log('err: ' + err);
            } else {
              console.log(result);
            }
          });
          
        }, 0);
      }
    });
    
    /*ClientCard.$scope.$emit('sendingCurrentClient', client);*/
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

  showSlider() {
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
  angularMeteor
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
