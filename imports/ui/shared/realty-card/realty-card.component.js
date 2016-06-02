/**
 * Created by Danpan on 10.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../helpers/dictionary';
import {Meteor} from 'meteor/meteor';

import './realty-card.view.html';

class RealtyCard {
  /* @ngInject */
  constructor($scope, $reactive, $mdDialog) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.show = true;
    this.mdDialog = $mdDialog;
    var vm = this;
    
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        vm.user = user;
        vm.data = {
            good_name: "ocaen_object_6mes",
            bill_first_name: user.profile.name,
            bill_email: user.emails[0].address,
            bill_phone: user.profile.phone,
            file_profile: "default",
            offerta_accept: "true"
        };
      }
    });
    
    this.close = function() {
      this.mdDialog.cancel();
    };
    
  }

  agentContinue (id) {
    if(id) this.objectAdded = true;
    else this.show = false;
  }

  changeRelationType(type,realtyId, clientId, isNew) {
    Meteor.call('changeRelationTypeInClient', type,realtyId,clientId,isNew);
  }
  
  openPurchaseStart (ev) {
    var vm = this;
    this.mdDialog.show({
      //controller: DialogController,
      template: `<md-dialog aria-label="Purchasing subscribtion" ng-cloak>
                    <md-toolbar>
                      <div class="md-toolbar-tools">
                        <h2>Оплата подписки</h2>
                        <span flex></span>
                        <md-button class="md-icon-button" ng-click="this.close()">
                          <md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon>
                        </md-button>
                      </div>
                    </md-toolbar>
                    <md-dialog-content>
                      <div class="md-dialog-content">
                        <h2>Безлимитное количество объектов за 990 рублей в месяц</h2>
                        <form id="__cmsform_order" role="form" method="POST" action="http://ariusbiz.justclick.ru/order/confirm/ocaen_object_period/?t=20985#form" target='blank' onsubmit="return __cmsformcheck_order()">
                          <input type="hidden" name="good_name" value="ocaen_object_period" />
                          <input type="hidden" name="bill_first_name" value="${this.data.bill_first_name}" />
                          <input type="hidden" name="bill_email" value="${this.data.bill_email}" />
                          <input type="hidden" name="bill_phone" value="${this.data.bill_phone}" />
                          <input type="hidden" name="offerta_accept" checked="${this.data.offerta_accept}" />
                          <md-button class="md-primary md-raised">
                              <input type="submit" value="Оплатить картой подписку на 1 месяц" name="doorder" class="feedback__nostyles p-0 m-0" />
                          </md-button>
                        </form>
                        <form id="__cmsform_order" role="form" method="POST" action="http://ariusbiz.justclick.ru/order/confirm/ocaen_object_6mes/?t=20986#form" target='blank' onsubmit="return __cmsformcheck_order()">
                          <input type="hidden" class="good-name" name="good_name" value="ocaen_object_6mes" />
                          <input type="hidden" name="bill_first_name" value="${this.data.bill_first_name}" />
                          <input type="hidden" name="bill_email" value="${this.data.bill_email}" />
                          <input type="hidden" name="bill_phone" value="${this.data.bill_phone}" />
                          <input type="hidden" name="offerta_accept" checked="${this.data.offerta_accept}" />
                          <md-button class="md-default md-raised">
                              <input type="submit" value="Оплатить другой системой за 6 месяцев" name="doorder" style='color:black;' class="feedback__nostyles p-0 m-0" />
                          </md-button>
                        </form>
                        <!--<md-button class="md-danger md-raised" ng-click='close()'>Закрыть!</md-button>-->
                      </div>
                    </md-dialog-content>
                </md-dialog>`,
      targetEvent: ev,
      clickOutsideToClose:true
    })
  }
  
  takeObject(id){
    console.log(id);
    this.objectAdded = true;
  }

  takeRealty(id, ev) {
    if (true != false) this.openPurchaseStart(ev);
    Meteor.call('takeRealty', id);
  }
  
  updateRealty (id) {
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
    this.slider({'images': this.realty.details.images});
  }
}

function DialogController($scope, $reactive, $mdDialog) {
  $reactive(this).attach($scope);
  this.close = function() {
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
    realtylisttype: '<'
  },
  controllerAs: moduleName,
  controller: RealtyCard
});
