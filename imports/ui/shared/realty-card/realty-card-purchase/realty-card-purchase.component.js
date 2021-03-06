/**
 * Created by Danpan on 10.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../../helpers/dictionary';
import {Meteor} from 'meteor/meteor';
// import '/imports/ui/shared/replenish-balance/replenish-balance.view.html';
import './realty-card-purchase.view.html';
import {RobokassaReplenishController} from '/imports/ui/shared/replenish-balance/robokassa-replenish.controller';
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
      this.change = (this.price - this.userBalance > 0) ? (this.price - this.userBalance < 1000) ? 1000 : this.price - this.userBalance : false;
    }
    for (let subscribtion of this.subscribtion.userSubscribtions) {
      if(subscribtion.codename == this.subscribtion.subscribeType && subscribtion.qty > 0) this.subscribeType = subscribtion.name;
    }

  }
  /**
   * @param ev - event
   */
  openPurchaseStart(ev, type) {
    console.log('this.realty.type', this.realty.type);
    this.mdDialog.show({
      controller: RobokassaReplenishController,
      controllerAs: 'robokassaDialog',
      //onsubmit="return __cmsformcheck_order()"
      templateUrl: 'imports/ui/shared/replenish-balance/replenish-balance.view.html',
      preserveScope: true,
      targetEvent: ev,
      clickOutsideToClose: true
    });
  }

  takeObjectViaSubscribtion () {
    let vm = this;
    Meteor.call('takeObjectViaSubscribtion', this.realty._id, this.subscribtion.subscribeType, this.realty.type, (err, result) => {
      if (err) {
        console.log('err: ', err);
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
  }

  takeRealty(id, ev, price, connection) {
    let vm = this;
    console.log(price);
    if (connection == 'taken') {
      Meteor.call('updateRealty', id, connection, (err, result) => {
        if (err) {
          console.log('err: ', err);
        } else {
          console.log(result);
        }
      });
    //TODO плохо понятно. надо переделать в связи с отменой оплаты подписки.
    } else if (this.user.profile.balance > price) {
      if (!this.con) {
        this.takeInProgress = true;
        Meteor.call('buyRealtyOcean', id, price, (err, result) => {
          if (err) {
            console.log('err: ' + err);
            this.takeInProgress = false;
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
          this.takeInProgress = true;
          Meteor.call('buyRealtyOcean', id, price, connection, (err, result) => {
            if (err) {
              console.log('err: ' + err);
              this.takeInProgress = false;
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
      this.state.go('crm.subscribe');
      //this.openPurchaseStart(ev);
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
    parseDetails: '=',
    subscribtion: '<'
  },
  controllerAs: moduleName,
  controller: RealtyCardPurchase
});

