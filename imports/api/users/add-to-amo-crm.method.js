'use strict';
import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http'

Meteor.methods({
  addToAmoCrm
});

export function addToAmoCrm(user, id) {
    
  if (Meteor.isServer && Meteor.userId()) {
    
    let url = 'https://winvest.amocrm.ru/private/bab2e7256c31d9273a8fb89638fde336/v2/json/contacts/set';
    let options = {
      'add/name':user.profile.name,
      'update/id':id || 1
    }
    
    HTTP.post(url, options, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });

  }
  
}

