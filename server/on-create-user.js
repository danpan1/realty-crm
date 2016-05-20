/**
 * Created by Danpan on 17.05.16.
 */
import nextAutoincrement from '/imports/helpers/getUniqueId';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';

const onCreateUser = function (options, user) {
  user.profile = options.profile;
  if (user.profile) {
    user.profile.realtorId = nextAutoincrement(Meteor.users);
  }
  return user;
};

Accounts.onCreateUser(onCreateUser);
