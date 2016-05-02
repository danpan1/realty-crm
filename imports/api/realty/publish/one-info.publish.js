/**
 * Created by Danpan on 23.03.16.
 */
import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty.model';
import {Roles} from 'meteor/alanning:roles';
if (Meteor.isServer) {

  Meteor.publish('oneInfo', function (id) {

    if (Roles.userIsInRole(this.userId, ['business'])) {
      // console.log(id);
      // console.log(Realty.findOne({'_id': id}));
      return Realty.find({'_id': id});
    }

  });
}
