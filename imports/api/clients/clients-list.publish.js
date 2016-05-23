/**
 * Created by Danpan on 10.05.16.
 */
import {Meteor} from 'meteor/meteor';
import {Clients} from './clients.model';
import {_} from 'meteor/underscore';
import {Counts} from 'meteor/tmeasday:publish-counts';


if (Meteor.isServer) {

  Meteor.publish('listClients', function (filter, options) {

    let selector = {};
    
    if (filter) {
      if (filter.status) {
        selector.status = filter.status;
      }
      if (filter._id) {
        selector._id = filter._id;
      }
    }
    
    Counts.publish(this, 'clientsCount', Clients.find(selector), {noReady: true});

    return Clients.find(selector,filter);
  });

}
