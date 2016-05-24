/**
 * Created by Danpan on 10.05.16.
 */
import {Meteor} from 'meteor/meteor';
import {Clients} from './clients.model';
import {_} from 'meteor/underscore';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {Roles} from 'meteor/alanning:roles';

if (Meteor.isServer) {

  Meteor.publish('listClients', function (filter, options) {

    // console.log(this.userId);

    if (this.userId) {

      let selector = {};

      if (filter) {
        if (filter.status) {
          selector.status = filter.status;
        }
        if (filter._id) {
          selector._id = filter._id;
        }
      }

      selector.realtorId = this.userId;

      Counts.publish(this, 'clientsCount', Clients.find(selector), {noReady: true});
      console.log(options);
      return Clients.find(selector, options);

    }

  });

}
