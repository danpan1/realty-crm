'use strict';
import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http'

Meteor.methods({
  amoCrmAuth
});

  
export function amoCrmAuth () {
  if (Meteor.isServer && Meteor.userId()) {
      
      let authUrl = ' https://winvest.amocrm.ru/api/unsorted/add/?api_key=bab2e7256c31d9273a8fb89638fde336&login=ilya.karev1000@gmail.com';
      let authOptions = {
        ['add/source']:'Миринедвижимость',
        ['add/source_uid']:'1a2b3c4d5e',
        ['add/source_data']:'SomeData'
      }
      
      HTTP.post(authUrl, authOptions, function (error, result) {
        if (error) {
          console.log('--- AUTH ERROR ---');
          console.log(error);
        } else {
          console.log('--- AUTH RESULT ---');
          console.log(result);
          console.log(result.headers['set-cookie']);
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
        }
      });
      
    }
}
  
  
    
    
    
    
    
    
    
    /*let url = 'https://winvest.amocrm.ru/private/api/v2/json/contacts/set';
    let options = {
      'add/name':user.profile.name,
      'update/id':id || 2
    }
    
    HTTP.post(url, options, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });*/

