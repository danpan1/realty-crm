/**
 * Created by Danpan on 09.04.16.
 */
'use strict';
import {Meteor} from 'meteor/meteor';
import {Clients} from './clients.model';
import {_} from 'meteor/underscore';
import {Roles} from 'meteor/alanning:roles';
import nextAutoincrement from '../../helpers/getUniqueId';
Meteor.methods({
  addClient
});

export function addClient(client, notRealtor) {
  console.log('casdc');
  if (Meteor.isServer && Meteor.userId()) {
    if (!notRealtor) {
      client.realtorId = Meteor.userId();
    }
    let nextValue = nextAutoincrement(Clients); // 1
    client._id = nextValue + '';
    Clients.insert(client, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Client added : id=${nextValue}`);
      }
    });
    return nextValue;

  }

};
