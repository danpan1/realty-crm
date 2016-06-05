/**
 * Created by Danpan on 05.06.16.
 */
/**
 * Created by Danpan on 08.04.16.
 */
import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';

if (Meteor.isServer) {
  Meteor.publish('users', function () {
      if (Roles.userIsInRole(this.userId, ['staff']) || Roles.userIsInRole(this.userId, ['admin'])) {

        let options = {};
        options.fields = {
          'roles': 1,
          'emails': 1,
          'profile': 1
        };
        console.log(options);
        return Meteor.users.find({}, options);
      }

    }
  );
}
