/**
 * Created by Danpan on 09.04.16.
 */
'use strict';
import {Meteor} from 'meteor/meteor';
import {Clients} from './clients.model';
import {_} from 'meteor/underscore';
import {Roles} from 'meteor/alanning:roles';
import nextAutoincrement from '../helpers/getUniqueId';
Meteor.methods({
  addClient
});

export function addClient(client) {
  console.log('casdc');
  if (Meteor.isServer && this.userId && Roles.userIsInRole(this.userId, ['business'])) {
    if (Roles.userIsInRole(this.userId, ['realtor'])) {
      client.realtorId = this.userId;
    }
    let nextValue = nextAutoincrement(Clients); // 1
    client._id = nextValue + '';
    Clients.insert(client);
    // Clients.insert.update({_id: id}, {
    //   $set: {
    //     'realtor.reviewDate': date,
    //     status: 'review'
    //   }
    // }, (error) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Submited  Review Date');
    //   }
    // });

  }

};
