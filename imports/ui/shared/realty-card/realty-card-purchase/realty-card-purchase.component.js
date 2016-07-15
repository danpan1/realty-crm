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
  constructor($scope, $reactive, $mdDialog, $timeout, $state) {
    $reactive(this).attach($scope);
    var vm = this;
    this.dictionary = dictionary;
    this.state = $state;
    this.timeout = $timeout;
    this.mdDialog = $mdDialog;
    this.cardContacts = this.contacts || {};
    if (this.realty.operator && this.realty.operator.oceanPrice !== undefined) {
      this.price = this.dictionary.priceList[this.realty.operator.oceanPrice].price;
      this.userBalance = this.user.profile.balance;
      this.change = this.price - this.userBalance > 0 ? this.price - this.userBalance < 1000 ? 1000 : this.price - this.userBalance : false;

      // Если это взятие в связях
      if (this.con) this.purchaseText = 'Взять за ' + this.price + ' рублей';
      // В другом месте
      else this.purchaseText = this.change ? 'Пополнить баланс на ' + this.change + ' рублей' : 'Взять за ' + this.price + ' рублей'
    }
    //this.cardContacts.realtyPhone = this.realty.contacts ? this.realty.contacts[0].phones[0].phone : '';
  }

  /**
   *
   * @param ev - event
   *
   */

  openPurchaseStart(ev, type) {
    console.log('this.realty.type', this.realty.type);
    const vm = this;

    const DialogController = function ($mdDialog) {
      if (type == 'connection') {
        // Если это взятие в связях

        this.amount = 5000;

        this.refillBalance = (amount) => {
          // Сюда добавить функцию, которая будет направлять в робокассу.
          console.log('Request to RoboKassa: refill balance by ' + amount + ' rubles');
          this.close();
        }

      } else {
        // Если в другом месте

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
                vm.timeout(()=> {
                  console.log(result);
                }, 100)
              }
            });
          } catch (error) {
            console.log(error);
          }
        }

      }

      this.close = () => {
        $mdDialog.cancel();
        console.log('success!');
      };

    }
    DialogController.$inject = ['$mdDialog'];
    this.timeout(() => {
      var htmlTemplate;
      htmlTemplate = `<md-dialog class="subscription-dialog" aria-label="Оплата подписки">
                              <md-toolbar>
                                <div class="md-toolbar-tools">
                                  <h2>Необходимо пополнить баланс</h2>
                                  <span flex></span>
                                  <md-button class="md-icon-button" ng-click="dialog.close()">
                                    <md-icon md-svg-src="svg/icon-close.svg" aria-label="Закрыть окно оплаты подписки"></md-icon>
                                  </md-button>
                                </div>
                              </md-toolbar>
                              <md-dialog-content>
                                <div class="md-dialog-content pv-16">
                                  <div layout="column">
                                    <form name="connection-purchase">
                                        <p> Укажите сумму не меньше 1000 рублей </p>
                                        <md-input-container>
                                          <input type="text" ng-model="dialog.amount" />
                                        </md-input-container>
                                        <md-button flex ng-disabled="dialog.amount < 1000" class="md-raised mv-16 ph-16" ng-click='dialog.refillBalance(dialog.amount)'>Пополнить</md-button>
                                    </form>
                                  </div>
                                </div>
                              </md-dialog-content>
                            </md-dialog>`
      this.mdDialog.show({
        controller: DialogController,
        controllerAs: 'dialog',
        //onsubmit="return __cmsformcheck_order()"
        template: htmlTemplate,
        preserveScope: true,
        targetEvent: ev,
        clickOutsideToClose: true
      })
    }, 50)
  }


  /*onShowPhone (realtyId, ev) {
   let vm = this;
   if(!this.shownPhone){
   if(this.userpaid){
   Meteor.call('takeRealty', realtyId, (err, result)=> {
   if (err) {
   console.log('err: ' + err);
   } else {
   console.log(result);
   vm.shownPhone = result.phone;
   }
   });
   } else {
   this.openPurchaseStart(ev);
   }
   }
   }*/

  takeRealty(id, ev, price, connection) {
    let vm = this;
    console.log(price);
    if (this.user.profile.balance > price) {
      if (!this.con) {
        Meteor.call('buyRealtyOcean', id, price, (err, result) => {
          if (err) {
            console.log('err: ' + err);
          } else {
            console.log(result);
            this.timeout(()=> {
              vm.cardContacts.realtyPhone = result.phone,
                vm.cardContacts.realtyName = result.name;
              vm.cardContacts.realtyStreet = result.address.street;
              vm.cardContacts.realtyHouse = result.address.house;
              vm.parseDetails = result.parseDetails;
            }, 0);
          }
        });
      } else {
        console.log('this.price - this.userBalance = ', this.price - this.userBalance)
        if (this.price - this.userBalance > 0) {
          this.openPurchaseStart(ev, connection);
          console.log('Open dialog')
        } else {
          Meteor.call('buyRealtyOcean', id, price, connection, (err, result) => {
            if (err) {
              console.log('err: ' + err);
            } else {
              console.log(result);
              if (connection == 'connection') {
                vm.cardContacts.realtyPhone = result.phone;
                vm.timeout(()=> {
                  vm.cardContacts.realtyPhone = result.phone;
                }, 500);
              }
            }
          });
        }
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
    contacts: '<',
    realty: '=',
    //userpaid: '=',
    con: '<',
    user: '<',
    parseDetails: '='
  },
  controllerAs: moduleName,
  controller: RealtyCardPurchase
});
