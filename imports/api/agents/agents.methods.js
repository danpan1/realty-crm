/**
 * Created by Danpan on 07.06.16.
 */
/**
 * Created by Danpan on 09.04.16.
 */
'use strict';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';
import {Agents} from './agents.model';
import {Roles} from 'meteor/alanning:roles';

Meteor.methods({
  oceanBanAgency
});
/**
 * Функция добавлеиния Телефона в бан лист агентств и очистки уже имеющихся Объектов Новых
 * @param phone
 * @param name
 */
export function oceanBanAgency(phone, name) {
  if (Meteor.isServer && Meteor.userId()/* && Roles.userIsInRole(Meteor.userId(), 'paid')*/) {
    console.log(phone);
    console.log(name);
    // 0. Проверить телефон в Агентствах
    // 1. Добавить телефон в Агентства
    if (phone) {
      Agents.insert({phone: phone, name: name}, (err)=> {
        if (err) {
          console.log(err);
        }
        else {
          console.log('ok agents added');
        }
      });

      // 2. Пройтись status 'new' и

      Realty.update({status: 'new', 'contacts.phones.phone': phone}, {$set: {status: 'agency'}}, (err)=> {
        if (err) {
          console.log(err);
        }
        else {
          console.log('realty agent updated');
        }
      });
    }

  }
}