'use strict';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {RoboInvoices} from './robo-invoices.model';
import Robokassa from './robokassa';
import nextAutoincrement from '../../helpers/getUniqueId';
/* HIGHLy IMPORTANT DONT CHANGE*/
/* HIGHLy IMPORTANT DONT CHANGE*/
/* HIGHLy IMPORTANT DONT CHANGE*/
const robokassa = new Robokassa({
  login: "rieltor.guru",
  password1: "bGH4cKsja370cKuf9QIS",
  password2: 'Scpt2T6SJ1Tu5zJVpyK2'
});
/* HIGHLy IMPORTANT DONT CHANGE*/

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
    throw new Meteor.Error('auth');
  }
  summ = parseInt(summ);
  check(summ, Number);
  check(description, String);
  console.log('no ereror');
  try {
    let id = nextAutoincrement(RoboInvoices) + '';
    let invoice = {
      _id: id,
      createDate: new Date(),
      description: description,
      userId: this.userId,
      summ: summ
    };
    RoboInvoices.insert(invoice);
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
    console.log('our invoice = ');
    console.log(invoice);
    console.log('roboOrder = ');
    console.log(order);
    let roboUrl = robokassa.merchantUrl(order);
    // console.log(roboUrl);
    return roboUrl;
  } catch (e) {
    console.log(e);
    throw new Meteor.error('RoboInvoise Insert');
  }
}
