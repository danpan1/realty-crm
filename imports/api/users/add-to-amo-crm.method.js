'use strict';
import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http'

Meteor.methods({
  amoCrmAuth,
  amoCrmNewContact,
  amoCrmTest,
  amoCrmUnsort,
  getResponseTest
});

let cookieAmoCrm;
export function amoCrmAuth() {
  if (Meteor.isServer && Meteor.userId()) {

    let authUrl = 'https://winvest.amocrm.ru/private/api/auth.php?type=json';
    let authOptions = {
      params: {
        USER_LOGIN: 'ilya.karev1000@gmail.com',
        USER_HASH: 'bab2e7256c31d9273a8fb89638fde336'
      }
    };
    let result;
    try {
      result = HTTP.post(authUrl, authOptions);
      console.log('--- AUTH RESULT ---');
      cookieAmoCrm = storeAuth(result);
      console.log(cookieAmoCrm);
      console.log(result.data.response.accounts);
    } catch (error) {
      console.log('--- AUTH ERROR ---');
      return error;
    }
    return result.data.response;

  }
}

export function getResponseTest(action) {
  if (Meteor.isServer && Meteor.userId()) {

    let getResponseAuthUrl = 'https://api.getresponse.com/v3/contacts';
    let getResponseAuthOptions = {
      "headers":{
        "Content-Type": "application/json",
        "X-Auth-Token": "api-key e75f681ae153ca7c870480d6957f8e42"
      },
      "body": {
        "name": "Ilya Karev",
        "email": "ilya.karev1000@gmail.com",
        "dayOfCycle": 0,
        "campaign": {
            "campaignId": "39360806"
        }
      }
    };
    let result;
    if(action == 'get'){
      try {
        result = HTTP.get(getResponseAuthUrl, getResponseAuthOptions);
        console.log(result);
      } catch (error) {
        console.log(error);
        return error;
      }
      return result;
    } else if (action == 'post') {
      try {
        result = HTTP.post(getResponseAuthUrl, getResponseAuthOptions);
        console.log(result);
      } catch (error) {
        console.log(error);
        return error;
      }
      return result;
    }
  }
}


export function amoCrmUnsort() {
    if (Meteor.isServer && Meteor.userId()) {
      let unsortUrl = 'https://winvest.amocrm.ru/api/unsorted/add?type=json&api_key=bab2e7256c31d9273a8fb89638fde336&login=ilya.karev1000@gmail.com';
      let unsortOptions = {
        headers : {
          Cookie : cookieAmoCrm
        },
        params: {
          "request": {
            "unsorted": {
              "add": {
                "source": "http://getrent.ru",
                "source_uid": null,
                "source_data": "amoCRM"
              }
            }
          }
        }
      };
      
      let result;
      try {
        result = HTTP.post(unsortUrl, unsortOptions);
        console.log('--- UNSORT RESULT ---');
        console.log(result);
      } catch (error) {
        console.log('--- UNSORT ERROR ---');
        result = error;
        console.log(error);
        return error;
      }
      console.log(result);
      return result.data.response;
    }
}
export function amoCrmNewContact() {
  if (Meteor.isServer && Meteor.userId()) {

    let newContactUrl = 'https://winvest.amocrm.ru/private/api/v2/json/contacts/set?type=json&USER_LOGIN=ilya.karev1000@gmail.com&USER_HASH=bab2e7256c31d9273a8fb89638fde336';
    let newContactOptions = {
      params: {
        "response": {
          "contacts": {
            "add": [
              {
                "name": 'Мистер Картошка'
              }
            ]
          }
        }
      }
    };
    
    let result;
    try {
      result = HTTP.post(newContactUrl, newContactOptions);
      console.log('--- NEW CONTACT RESULT ---');
      console.log(result.data.response);
    } catch (error) {
      console.log('--- NEW CONTACT ERROR ---');
      console.log(error);
      result = error;
      return error;
    }
    return result.data.response;

  }
}

export function amoCrmTest() {
  if (Meteor.isServer && Meteor.userId()) {
    console.log('amoCrmTest');
    // let cookie = cookieAmoCrm.join('; ');
    // console.log(cookie);
    let testUrl = 'https://winvest.amocrm.ru/private/api/v2/json/accounts/current';
    let testOptions = {
      headers : {
        // Cookie : cookie
        Cookie : cookieAmoCrm
      }
    };    
    let result;
    try {
      result = HTTP.get(testUrl, testOptions);
      console.log('--- TEST RESULT ---');
      console.log(result.data.response);
    } catch (error) {
      console.log('--- TEST ERROR ---');
      return error;
    }
    return result.data.response;

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

function storeAuth (res) {
  var cookies = res.headers['set-cookie'];

  if (!cookies) {
    throw new Error('AmoCRM auth failed');
  }

  return cookies.map(parseCookie).join('; ');

  function parseCookie (cookieHeader) {
    return cookieHeader.split(';')[0];
  }
};
