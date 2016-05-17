/**
 * Created by Danpan on 17.05.16.
 */
import nextAutoincrement from '/imports/api/helpers/getUniqueId';
import { Accounts } from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';

console.log('asdfasdfsd');
const onCreateUser = function (options, user) {
  // let nextAutoincrement =
  console.log('onCreateUser');
  let nextValue = nextAutoincrement(Meteor.users); // 1
  console.log(nextValue);
  //user.roles = ['operator'];
  //Roles.addUsersToRoles(user._id, ['operator'], Roles.GLOBAL_GROUP);
  user.realtorId = nextValue;
  // user.counterRealtyMy = 0;
  return user;
};

Accounts.onCreateUser(onCreateUser);
