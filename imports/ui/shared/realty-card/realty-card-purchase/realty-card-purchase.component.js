/**
 * Created by Danpan on 10.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../../helpers/dictionary';
import {Meteor} from 'meteor/meteor';
import {Realty} from '../../../../api/realty';

import './realty-card-purchase.view.html';

class RealtyCardPurchase {
  /* @ngInject */
  constructor($scope, $reactive, $mdDialog, $timeout, $state, $rootElement) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.state = $state;
    this.timeout = $timeout;
    this.mdDialog = $mdDialog;
    this.contacts.realtyPhone = this.realty.contacts ? this.realty.contacts[0].phones[0].phone : '';
    var vm = this;
    
    vm.contacts = {};

    if (vm.con && vm.userpaid) {
      
    }
    
  }

  /**
   *
   * @param ev - event
   * @param type - Arenda or Sale
   */
  
  openPurchaseStart (ev, type) {
    let saleOrArenda = '', operation = '', amount = '';
    console.log('this.realty.type', this.realty.type);
    if(this.realty.type === 1){
      saleOrArenda = 'sale';
      operation = 'Продажу';
      amount = '1440';
      price = {
        arenda1:1440,
        arenda6:6480
      }
    } else {
      saleOrArenda = 'arenda';
      operation = 'Аренду';
      amount = '990';
      price = {
        arenda1:990,
        arenda6:4455
      }
      price.arendaIprodaza1 = 1880;
      price.arendaIprodaza6 = 7290;
    }
    const vm = this;
    
    const DialogController = function ($mdDialog) {
      this.close = () => {
        $mdDialog.cancel();
        console.log('success!');
      };
      
      this.createLead = (name, price) => {
        let purchaseInfo = {
          name: name,
          price: price
        }
        try {
          Meteor.call('amoCrmNewDeal', purchaseInfo, (error, result) => {
            if (error) {
              console.log(error);
            } else {
              vm.timeout(()=>{
                console.log(result);
              },100)
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
    DialogController.$inject = ['$mdDialog'];

    this.mdDialog.show({
      controller: DialogController,
      controllerAs : 'dialog',
      //onsubmit="return __cmsformcheck_order()"
      template: `<md-dialog class="subscription-dialog" aria-label="Оплата подписки" ng-cloak>
                    <md-toolbar>
                      <div class="md-toolbar-tools">
                        <h2>Оплата «Океан объектов»</h2>
                        <span flex></span>
                        <md-button class="md-icon-button" ng-click="dialog.close()">
                          <md-icon md-svg-src="svg/icon-close.svg" aria-label="Закрыть окно оплаты подписки"></md-icon>
                        </md-button>
                      </div>
                    </md-toolbar>
                    <md-dialog-content>
                      <div class="md-dialog-content pv-16">
                        <div layout="column">
                          <div layout="row" flex="80">
                            <h3 class="md-subhead text-center">Безлимитное количество объектов</h3>
                          </div>
                          <form id="__cmsform_order" role="form" method="POST" action="http://ariusbiz.justclick.ru/order/confirm/ocean_object_${saleOrArenda}_1mes/" target='blank'>
                            <input type="hidden" name="good_name" value="ocean_object_${saleOrArenda}_1mes" />
                            <input type="hidden" name="bill_first_name" value="${this.data.bill_first_name}" />
                            <input type="hidden" name="bill_email" value="${this.data.bill_email}" />
                            <input type="hidden" name="bill_phone" value="${this.data.bill_phone}" />
                            <input type="hidden" name="offerta_accept" checked="${this.data.offerta_accept}" />
                            <div layout="row">
                              <md-button flex class=" md-raised mv-16 ph-16" ng-click='dialog.createLead("Океан: аренда на один месяц", ${price.arenda1})'>
                                <input type="submit" value="подписаться на ${operation} за ${amount}&#8381; в месяц" name="doorder" class="feedback__nostyles" style='color:black;' />
                              </md-button>
                          </form>
                        </div>
                        <form id="__cmsform_order" role="form" method="POST" action="http://ariusbiz.justclick.ru/order/confirm/ocean_object_${saleOrArenda}_6mes/" target='blank'>
                          <input type="hidden" class="good-name" name="good_name" value="ocean_object_${saleOrArenda}_6mes" />
                          <input type="hidden" name="bill_first_name" value="${this.data.bill_first_name}" />
                          <input type="hidden" name="bill_email" value="${this.data.bill_email}" />
                          <input type="hidden" name="bill_phone" value="${this.data.bill_phone}" />
                          <input type="hidden" name="offerta_accept" checked="${this.data.offerta_accept}" />
                          <div layout="row">
                            <md-button flex class="md-primary md-raised mv-16 ph-16 flex" ng-click='dialog.createLead("Океан: аренда на 6 месяцев", ${price.arenda6})'>
                              <input type="submit" value="оплатить ${operation} за 6 месяцев со скидкой 25%" name="doorder" class="feedback__nostyles" />
                            </md-button>
                          </div>
                        </form>
                        <form id="__cmsform_order" role="form" method="POST" action="http://ariusbiz.justclick.ru/order/confirm/ocean_object_arenda_sale_1mes/" target='blank'>
                          <input type="hidden" class="good-name" name="good_name" value="ocean_object_arenda_sale_1mes" />
                          <input type="hidden" name="bill_first_name" value="${this.data.bill_first_name}" />
                          <input type="hidden" name="bill_email" value="${this.data.bill_email}" />
                          <input type="hidden" name="bill_phone" value="${this.data.bill_phone}" />
                          <input type="hidden" name="offerta_accept" checked="${this.data.offerta_accept}" />
                          <div layout="row">
                            <md-button flex class="md-warn md-raised mv-16 ph-16 flex" ng-click='dialog.createLead("Океан: аренда и продажа на один месяц", ${price.arendaIprodaza1})'>
                              <input type="submit" value="подписаться на аренду и продажу за 1 880Р в месяц со скидкой 25%" name="doorder" class="feedback__nostyles" />
                            </md-button>
                          </div>
                        </form>
                        <form id="__cmsform_order" role="form" method="POST" action="http://ariusbiz.justclick.ru/order/confirm/ocean_object_arenda_sale_6mes/" target='blank'>
                          <input type="hidden" class="good-name" name="good_name" value="ocean_object_arenda_sale_6mes" />
                          <input type="hidden" name="bill_first_name" value="${this.data.bill_first_name}" />
                          <input type="hidden" name="bill_email" value="${this.data.bill_email}" />
                          <input type="hidden" name="bill_phone" value="${this.data.bill_phone}" />
                          <input type="hidden" name="offerta_accept" checked="${this.data.offerta_accept}" />
                          <div layout="row">
                            <md-button flex class="md-warn md-raised mv-16 ph-16 flex" ng-click='dialog.createLead("Океан: аренда и продажа на 6 месяцев", ${price.arendaIprodaza6})'>
                              <input type="submit" value="оплатить аренду и продажу за 6 месяцев со скидкой 50%" name="doorder" class="feedback__nostyles" />
                            </md-button>
                          </div>
                        </form>
                        
                      </div>
                    </md-dialog-content>
                </md-dialog>`,
      preserveScope: true,
      targetEvent: ev,
      clickOutsideToClose: true
    })
  }

  
  onShowPhone (realtyId, ev) {
    if(!this.shownPhone){
      if(this.userpaid){
        Meteor.call('takeRealty', realtyId, (err, result)=> {
          if (err) {
            console.log('err: ' + err);
          } else {
            console.log(result);
            this.shownPhone = result.phone;
          }
        });
      } else {
        this.openPurchaseStart(ev);
      }
    }
  }
  
  takeRealty(id, ev, connection) {
    let vm = this;
    if(this.userpaid){
      if(!this.con){
        Meteor.call('takeRealty', id, (err, result) => {
          if (err) {
            console.log('err: ' + err);
          } else {
            console.log(result);
            this.timeout(()=> {
              vm.contacts.realtyPhone = result.phone,
              vm.contacts.realtyName = result.name;
              vm.contacts.realtyStreet = result.address.street;
              vm.contacts.realtyHouse = result.address.house;
            }, 0);
          }
        });
      } else {
        Meteor.call('takeRealtyToConnections', id, connection, (err, result) => {
          if (err) {
            console.log('err: ' + err);
          } else {
            console.log(result);
            if(connection == 'connection'){
              this.timeout(()=> {
                vm.contacts.realtyPhone = result.phone;
              }, 0);
            }
          }
        });
      }
    } else {
      this.openPurchaseStart(ev);
    }
  }
  
}

const moduleName = 'realtyCardPurchase';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/realty-card/realty-card-purchase/realty-card-purchase.view.html',
  bindings: {
    data: '=',
    contacts: '=',
    realty: '=',
    userpaid: '=',
    con: '<'
  },
  controllerAs: moduleName,
  controller: RealtyCardPurchase
});
