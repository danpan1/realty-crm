/**
 * Created by Danpan on 10.05.16.
 */
import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

import {Clients} from './clients.model';

if (Meteor.isServer) {

  Meteor.publish('listClients', function (filter, options) {

    let selector = {};

    if (filter) {
      if (filter.status) {
        selector.status = filter.status;
      }
      if (filter.realtorId) {
        selector.realtorId = filter.realtorId;
      }

    }

    return Clients.find(selector,options);
  });

}
