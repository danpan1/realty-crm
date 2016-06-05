import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';

Meteor.startup(function () {
  let id = '';
  if (Meteor.users.find({roles: 'staff', 'emails.address': 'danpan@yandex.ru'}).count() === 0) {
    let dan = Meteor.users.findOne({'emails.address': 'danpan@yandex.ru'});
    let den = Meteor.users.findOne({'emails.address': 'superdenceo@gmail.com'});
    if (dan) {
      Roles.addUsersToRoles(dan._id, ['staff', 'admin']);
    }
    if (den) {
      Roles.addUsersToRoles(den._id, ['staff', 'admin']);
    }
  }
  if (Meteor.users.find({roles: 'staff'}).count() === 0) {
    let admins = [
      {
        email: 'admin@rieltor.guru',
        password: '669htB7NLDR3TTJ9',
        profile: {
          name: 'Админ'
        }
      }
    ];

    for (let key in admins) {
      id = Accounts.createUser(admins[key]);
      Roles.addUsersToRoles(id, 'staff');
    }

    /*
     Realtors
     */

    id = Accounts.createUser(
      {
        email: 'realtor-qa@realtor.guru',
        password: '77DX3G73M2SWaYG',
        profile: {}
      });

    /*
     Operators
     */

    let operators = [
      {
        email: 'callcenter1@rieltor.guru',
        password: 'F6R2VDV3cPP9U85',
        profile: {
          name: 'Оператор 1'
        }
      },
      {
        email: 'callcenter2@rieltor.guru',
        password: 'M8cN2ZWY2CY8y7P3',
        profile: {
          name: 'Оператор 2'
        }
      },
      {
        email: 'moderator@rieltor.guru',
        password: 'RQv768FWSJ55B2V',
        profile: {
          name: 'Модератор'
        }
      }
    ];

    for (let key in operators) {
      id = Accounts.createUser(operators[key]);
      Roles.addUsersToRoles(id, 'staff');
    }
  }
});
