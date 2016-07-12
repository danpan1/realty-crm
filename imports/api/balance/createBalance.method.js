/**
 * Created by Danpan on 12.07.16.
 */

import {Balance} from './balance.model';
import {Meteor} from 'meteor/meteor';

Meteor.methods({
  createBalance
});
/**
 * Создаем баланс юзера в коллекции балансов
 * @param {string} userId
 */
export function createBalance(userId) {
  if (Meteor.isServer) {
    let balance = {
      credit: 0,
      current: 0,
      totalPayments: 0,
      userId: userId
    };
    Balance.insert(balance);
  }
}
