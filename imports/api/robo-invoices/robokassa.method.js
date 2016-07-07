'use strict';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {RoboInvoices} from './robo-invoices.model';
import Robokassa from 'robokassa';

const robokassa = new Robokassa({
  login: "world-invest",
  password1: "qq8OB0UE4ACE5iovIW5T",
  password2: 'vnP816lFijta1fHfVfx6'
});

Meteor.methods({
  replenishTheBalance
});
/**
 * Пополнение баланса
 * @param {number} summ сумма пополнения
 * @param {string} description описание ( Пополнение баланса)
 * return {string} url ссылка для перехода в робокассу
 */
export function replenishTheBalance(summ, description) {
  check(summ, Number);
  check(description, String);
  let url;
  console.log(sum, 'sum покупки');
  if (Meteor.isServer && this.userId) {
    throw new Meteor.error('auth');
  }
  try {
    let invoiceId = RoboInvoices.insert({
      createDate: new Date(),
      description: description,
      userId: this.userId,
      summ: summ
    });
    /*
     *  --- order data ---
     * order.id
     * order.description
     * order.summ
     * order.currency
     * order.lang
     *
     */

    url = robokassa.merchantUrl({id: invoiceId, summ: summ, description: description});
  } catch (e){
    console.log(e);
    throw new Meteor.error('RoboInvoise Insert');
  }
  return url;
}
