import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';

Meteor.startup(function () {
  let id = '';
  //TODO какие есть роли и как их применять
  if (Meteor.users.find().count() === 0) {
    let admins = [
      {
        email: 'danpan@yandex.ru',
        password: "A8PP9m7TaFM494CU",
        profile: {
          name: 'Данил',
          phone: '79165315252',
          surName: 'Панкрашин'
        }
      },

      {
        email: 'superdenceo@gmail.com',
        password: '123456',
        profile: {
          name: 'Денис',
          phone: '79250759587',
          surName: 'Новаковский'
        }
      },
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
      Roles.addUsersToRoles(id, 'admin');
      Roles.addUsersToRoles(id, 'realtor');
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
    Roles.addUsersToRoles(id, 'realtor');

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
