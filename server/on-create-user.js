/**
 * Created by Danpan on 17.05.16.
 */
import nextAutoincrement from '/imports/helpers/getUniqueId';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
const onCreateUser = function (options, user) {

  let userPhoneIsExist = Meteor.users.findOne({'profile.phone' : options.profile.phone});
  console.log(userPhoneIsExist);
  if (userPhoneIsExist) {
    throw new Meteor.Error('Phone is exist');
  }

  console.log(user._id);
  user.profile = options.profile;
  if (user.profile) {
    user.profile.realtorId = nextAutoincrement(Meteor.users);
    /* баланс пользователя на клиенте */
    user.profile.balance = 0;
    /* реальный балан пользователя*/
    Meteor.call('createBalance', user._id);
  }

  return user;
};

Accounts.onCreateUser(onCreateUser);
