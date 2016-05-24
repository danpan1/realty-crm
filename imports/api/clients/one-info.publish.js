/**
 * Created by Danpan on 23.03.16.
 */
import {Meteor} from 'meteor/meteor';
import {Clients} from './clients.model';
import {Roles} from 'meteor/alanning:roles';

if (Meteor.isServer) {

  Meteor.publish('clientInfo', function (id) {

    if (this.userId) {
      console.log(id);
      return Clients.find({'_id': id});
    }

  });
}
