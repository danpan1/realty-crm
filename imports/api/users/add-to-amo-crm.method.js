'use strict';
import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http'

Meteor.methods({
  amoCrmAuth,
  amoCrmNewContact,
  amoCrmUnsort
});

  
export function amoCrmAuth () {
  if (Meteor.isServer && Meteor.userId()) {
      
      let authUrl = 'https://winvest.amocrm.ru/private/api/auth.php';
      let authOptions = {
        USER_LOGIN:'ilya.karev1000@gmail.com',
        USER_HASH:'bab2e7256c31d9273a8fb89638fde336'
      };
      HTTP.post(authUrl, authOptions, function (error, result) {
        if (error) {
          console.log('--- AUTH ERROR ---');
          console.log(error);
        } else {
          console.log('--- AUTH RESULT ---');
          console.log(result);
        }
      });
      
    }
}

export function amoCrmNewContact () {
  if (Meteor.isServer && Meteor.userId()) {
    
    let newContactUrl = 'https://winvest.amocrm.ru/private/api/v2/json/contacts/set';
    let newTime = new Date();
    newTime = newTime.getTime()
    let newContactOptions = {
      "response": {
        "contacts": {
          "add": [
            {
              "id": 10720146,
              "request_id": 1
            }
          ]
        },
        "server_time": newTime
      }
    }
    HTTP.post(newContactUrl, newContactOptions, function (error, result) {
      if (error) {
        console.log('--- NEW CONTACT ERROR ---');
        console.log(error);
      } else {
        console.log('--- NEW CONTACT RESULT ---');
        console.log(result);
      }
    });
          
  }
}

export function amoCrmUnsort () {
  if (Meteor.isServer && Meteor.userId()) {
      
      let unsortUrl = 'https://winvest.amocrm.ru/api/unsorted/add/?api_key=bab2e7256c31d9273a8fb89638fde336&login=ilya.karev1000@gmail.com';
      let unsortOptions = {
        "request":{
          "unsorted":{
            "add":{
              "source":"http://getrent.ru",
              "source_uid": null,
              "source_data": "amoCRM"
            }
          }
        }
      };
      HTTP.post(unsortUrl, unsortOptions, function (error, result) {
        if (error) {
          console.log('--- UNSORT ERROR ---');
          console.log(error);
        } else {
          console.log('--- UNSORT RESULT ---');
          console.log(result);
        }
      });
      
    }
}



/*
let newContactUrl = 'https://winvest.amocrm.ru/private/api/v2/json/contacts/set';
let newContactOptions = {
  'add/name':this.userId || 'mister X',
  'update/id': 3
}

HTTP.post(newContactUrl, newContactOptions, function (error, result) {
  if (error) {
    console.log('--- NEW CONTACT ERROR ---');
    console.log(error);
  } else {
    console.log('--- NEW CONTACT RESULT ---');
    console.log(result);
  }
});
*/