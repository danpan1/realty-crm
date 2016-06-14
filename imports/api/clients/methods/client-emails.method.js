'use strict';
import {Meteor} from 'meteor/meteor';
import {Clients} from '../clients.model.js';

Meteor.methods({
  clientEmails
});

export function clientEmails(email) {
    
  if (Meteor.isServer && Meteor.userId()) {
      
    if (this.userId && email.match(/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/)) {

      let selector = {
        realtorId: this.userId,
        email: email
      };
      
      let client = Clients.findOne(selector);
      
      return client.name;
      
    }
  }
  
}

