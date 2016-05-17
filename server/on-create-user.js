/**
 * Created by Danpan on 17.05.16.
 */
import nextAutoincrement from '/imports/api/helpers/getUniqueId';
import { Accounts } from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';

const onCreateUser = function (options, user) {
  user.realtorId = nextAutoincrement(Meteor.users); // 1
  //user.roles = ['operator'];
  //Roles.addUsersToRoles(user._id, ['operator'], Roles.GLOBAL_GROUP);
  return user;
};

Accounts.onCreateUser(onCreateUser);
