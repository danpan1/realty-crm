'use strict';
import {Meteor} from 'meteor/meteor';
import {Subscribe} from '../subscribe.model.js';

Meteor.methods({
  insertSubscribe
});

export function insertSubscribe (subscribe) {
  
  if (Meteor.isServer && Meteor.userId()) {
    
   subscribe.userId = this.userId;

   Realty.insert(subscribe, (error) => {
     if (error) {
       console.log(error);
     } else {
       console.log(`Realty added : id=${subscribe._id}`);
     }
   });

   return realty._id;
   
  }
  
}