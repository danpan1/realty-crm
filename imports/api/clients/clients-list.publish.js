/**
 * Created by Danpan on 10.05.16.
 */
import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

import {Clients} from './clients.model';

if (Meteor.isServer) {

  Meteor.publish('listClients', function (filter, options) {

    let selector = {};
    
    console.log(filter);
    console.log(this.userId);
    
    if (filter) {
      if (filter.status) {
        selector.status = filter.status;
      }
      if (filter._id) {
        selector._id = filter._id;
      }
    }

    return Clients.find(selector,options);
  });

}
