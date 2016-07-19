/**
 * Created by Danpan on 15.07.16.
 */
import {Meteor} from 'meteor/meteor';


import './replenish-balance.view.html';
export class RobokassaReplenishController {
  /* @ngInject */
  constructor($mdDialog, $window) {
    this.$window = $window;
    this.$mdDialog = $mdDialog;
    this.error = null;
    /* Минимальная сумма пополнения */
    this.minAmount = 1000;
    /* Сумма по умолчанию стоящая в инпуте */
    this.defaultAmount = 1000;
    /* amount - input */
    this.amount = this.defaultAmount;
  }

  refillBalance() {
    let amount = this.amount;
    console.log('Request to RoboKassa: refill balance by ' + amount + ' rubles');
    let description = 'Пополнение баланса CRM Мир и Недвижимость на ' + amount;
    Meteor.call('replenishTheBalance', amount, description, (err, res)=> {
      if (err) {
        this.error = err;
        return;
      }
      console.log(res);
      this.$window.open(res, '_self');
    });
  }

  close() {
    this.$mdDialog.cancel();
  }
}

