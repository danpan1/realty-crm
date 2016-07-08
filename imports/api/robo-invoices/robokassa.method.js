'use strict';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {RoboInvoices} from './robo-invoices.model';
import Robokassa from './robokassa';
import nextAutoincrement from '../../helpers/getUniqueId';
const robokassa = new Robokassa({
  login: "rieltor.guru",
  password1: "cOL2cvZvKq38u3ubQC2x",
  password2: 'GC9VBC3tPCj3EL0V1mGl'
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
  let url;
  console.log(summ, 'sum покупки');
  if (!(Meteor.isServer && this.userId)) {
    console.log('ereror');
    throw new Meteor.Error('auth');
  }
  check(summ, Number);
  check(description, String);
  console.log('no ereror');
  try {
    let id = nextAutoincrement(RoboInvoices) + '';
    RoboInvoices.insert({
      _id: id,
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
    let order = {id: id, summ: summ, description: description};
    console.log(order);
    return robokassa.merchantUrl(order);
  } catch (e) {
    console.log(e);
    throw new Meteor.error('RoboInvoise Insert');
  }
}