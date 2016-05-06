/**
 * Created by Danpan on 06.05.16.
 */
import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

import {Clients} from './clients.model';

if (Meteor.isServer) {

  Meteor.publish('myClients', function () {

    let selector = {
        realtorId: this.userId
      };
    console.log('boris');
    console.log(selector);
    return Clients.find(selector);
  });

}
