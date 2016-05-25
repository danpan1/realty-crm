/**
 * Created by Danpan on 10.05.16.
 */
import {Meteor} from 'meteor/meteor';
import {Clients} from '../clients.model';
import {_} from 'meteor/underscore';
import {Counts} from 'meteor/tmeasday:publish-counts';

if (Meteor.isServer) {

  Meteor.publish('relationClients', function (relations) {

    // console.log(this.userId);

    if (this.userId && relations) {
      let clientsRelated = relations.map((item)=> {
        return item.clientId;
      });
      console.log(clientsRelated, 'clientsRelated');
      let selector = {
        _id: {$in: clientsRelated},
        status: 'realtor'
      };
      return Clients.find(selector);
    }
  });
}
