'use strict';
import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http'

Meteor.methods({
  amoCrmAuth,
  amoCrmNewContact,
  amoCrmUnsort
});

let cookieAmoCrm;
export function amoCrmAuth() {
  if (Meteor.isServer && Meteor.userId()) {

    let authUrl = 'https://winvest.amocrm.ru/private/api/auth.php?type=json';
    let authOptions = {
      params: {
        USER_LOGIN: 'danpan@yandex.ru',
        USER_HASH: '09717d670f405bb6a098628b2fa270bf'
      }
    };
    HTTP.post(authUrl, authOptions, function (error, result) {
      if (error) {
        console.log('--- AUTH ERROR ---');
        console.log(error);
      } else {
        console.log('--- AUTH RESULT ---');
        console.log(result);
        cookieAmoCrm = storeAuth(result);
        console.log(cookieAmoCrm);
        console.log(result.data.response.accounts);
      }
    });

  }
}

export function amoCrmNewContact() {
  if (Meteor.isServer && Meteor.userId()) {

    let newContactUrl = 'https://winvest.amocrm.ru/private/api/v2/json/contacts/set';
    let newTime = new Date();
    newTime = newTime.getTime();
    let newContactOptions = {
      params: {
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
    };
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

export function amoCrmUnsort() {
  if (Meteor.isServer && Meteor.userId()) {
    console.log('amoCrmUnsort');
    // let cookie = cookieAmoCrm.join('; ');
    // console.log(cookie);
    let authUrl = 'https://winvest.amocrm.ru/private/api/v2/json/accounts/current';
    let authOptions = {
      headers : {
        // Cookie : cookie
        Cookie : cookieAmoCrm
      }
    };
    console.log(authOptions);
    HTTP.get(authUrl, authOptions, function (error, result) {
      if (error) {
        console.log('--- AUTH ERROR ---');
        console.log(error);
        console.log(error.response.data.response);
      } else {
        console.log('--- AUTH RESULT ---');
        console.log(result);
        cookieAmoCrm = storeAuth(result);
        console.log(cookieAmoCrm);
        console.log(result.data.response);
      }
    });

    // let unsortUrl = 'https://winvest.amocrm.ru/api/unsorted/add/?api_key=bab2e7256c31d9273a8fb89638fde336&login=ilya.karev1000@gmail.com';
    // let unsortOptions = {
    //   params: {
    //     "request": {
    //       "unsorted": {
    //         "add": {
    //           "source": "http://getrent.ru",
    //           "source_uid": null,
    //           "source_data": "amoCRM"
    //         }
    //       }
    //     }
    //   }
    // };
    // HTTP.post(unsortUrl, unsortOptions, function (error, result) {
    //   if (error) {
    //     console.log('--- UNSORT ERROR ---');
    //     console.log(error);
    //   } else {
    //     console.log('--- UNSORT RESULT ---');
    //     console.log(result);
    //   }
    // });

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
