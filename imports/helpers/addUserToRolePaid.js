/**
 * Created by Danpan on 02.06.16.
 */

/**
 * Created by Danpan on 09.04.16.
 */
'use strict';
import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';

Meteor.methods({
  addUsersToRolePaid,
  addUsersToRolePaidSale
});

/**
 * addRealtyToMyList - взять объект недвижимости. Кнопка взять на странице Новые объекты.
 * @param realtyId
 */
export function addUsersToRolePaid(userEmail) {

  if (Meteor.isServer && Meteor.userId() && Roles.userIsInRole(Meteor.userId(), 'staff')) {
    console.log(userEmail);
    let user = Meteor.users.findOne({'emails.address': userEmail});
    if (user) {
      console.log(user);
      if (Roles.userIsInRole(user._id, 'paid')) {
        return 'уже добавлен в подписку';
      }
      Roles.addUsersToRoles(user._id, 'paid');
      console.log('userAdded');
      return 'userAdded Rent';
    } else {
      console.log('user not found');
      return 'user not found';
    }
  } else {
    console.log('no Access');
  }
}

export function addUsersToRolePaidSale(userEmail) {

  if (Meteor.isServer && Meteor.userId() && Roles.userIsInRole(Meteor.userId(), 'staff')) {
    console.log(userEmail);
    let user = Meteor.users.findOne({'emails.address': userEmail});
    if (user) {
      console.log(user);
      if (Roles.userIsInRole(user._id, 'paidSale')) {
        return 'уже добавлен в подписку';
      }
      Roles.addUsersToRoles(user._id, 'paidSale');
      console.log('userAdded');
      return 'userAdded Sale';
    } else {
      console.log('user not found');
      return 'user not found';
    }
  } else {
    console.log('no Access');
  }
}
