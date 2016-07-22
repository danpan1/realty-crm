'use strict';
import {Meteor} from 'meteor/meteor';
import {Users} from '/server/users.model.js';
import {HTTP} from 'meteor/http';
import {Roles} from 'meteor/alanning:roles';
import {_} from 'meteor/underscore';

Meteor.methods({
  amoCrmAuth,
  amoCrmNewContact,
  amoCrmNewDeal,
  amoCrmEditContact,
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
        USER_HASH: '80b3ab5cf5cfda0cc4743d1f996a0e5f'
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

export function getResponseTest(action, info) {
  if (Meteor.isServer && Meteor.userId()) {

    let getResponseAuthUrl = 'https://api.getresponse.com/v3/contacts';
    let getResponseAuthOptions = {
      "headers":{
        "Content-Type": "application/json",
        "X-Auth-Token": "api-key e75f681ae153ca7c870480d6957f8e42"
      },
      "data": {
        "name": info.name,
        "email": info.email,
        "dayOfCycle": 0,
        "campaign": {
            "campaignId": "pmy7D"
        }
        //pmBFs - for paid clients
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
      let newdate = new Date().getTime();
      let unsortUrl = 'https://winvest.amocrm.ru/api/unsorted/add?type=json&api_key=80b3ab5cf5cfda0cc4743d1f996a0e5f&login=ilya.karev1000@gmail.com';
      let unsortOptions = {
        "data": {
          "request": {
            "unsorted": {
              "category": "mail",
              "add": {
                "source": "http://getrent.ru",
                "source_uid": null,
                "data": {
                  "contacts": [
                    {
                      "name":"Mister Twister"
                    }
                  ],
                },
                "source_data": {
                  "from":{
                    "email":"ilya.karev1000@gmail.com",
                    "name":"Мир и недвижимость"
                  },
                  "date": newdate,
                  "subject":"Регистрация нового пользователя",
                  "thread_id":null,
                  "message_id":null
                }
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


export function amoCrmNewContact(info) {
  if (Meteor.isServer && Meteor.userId()) {
    
    if(!info || !info.name) info = {
      name: 'Дедушка Пёс',
      phone: '89235755159',
      email: 'grandpa-dog@yandex.ru'
    }; 
    
    console.log('==== INFO ====')
    console.log(info.name)
    console.log(info.phone)
    console.log(info.email)
    
    let newContactUrl = 'https://winvest.amocrm.ru/private/api/v2/json/contacts/set?type=json';
    let newContactOptions = {
      "data": {
        "USER_LOGIN": 'ilya.karev1000@gmail.com',
        "USER_HASH": '80b3ab5cf5cfda0cc4743d1f996a0e5f',
        "request": {
          "contacts": {
            "add": [
              {
                "name": info.name,
                "custom_fields":  [
                  {
                    "id":  55400,
                    "values":  [
                      {
                        "value": info.phone,
                        "enum": "MOB"
                      }
                    ]
                  },
                  {
                    "id":  55402,
                    "values":  [
                      {
                        "value": info.email,
                        "enum": "WORK"
                      }
                    ]
                  }
                ]
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
      result = error;
      return error;
    }
    //console.log(result.data.response);
    uniqueId = result.data.response.contacts.add[0].id;
    timestamp = result.data.response.server_time;
    if(uniqueId){
      console.log('uniqueId: ' + uniqueId);
      console.log('timestamp: ' + timestamp);
      
      let user = Meteor.users.findOne({_id: this.userId});
      console.log('user: ' + user);
      Meteor.users.update({_id: this.userId}, {
        $set: {
          'profile.amoCrm': {
            id:uniqueId,
            timestamp:timestamp
          }
        }
      });
      console.log('=== user.profile.amoCrm ===');
      console.log(user.profile.amoCrm);
    }

  }
}

export function amoCrmNewDeal(purchaseInfo) {
  if (Meteor.isServer && Meteor.userId()) {
    
    let newDealUrl = 'https://winvest.amocrm.ru/private/api/v2/json/leads/set?type=json';
    let newDealOptions = {
      "data": {
        "USER_LOGIN": 'ilya.karev1000@gmail.com',
        "USER_HASH": '80b3ab5cf5cfda0cc4743d1f996a0e5f',
        "request": {
          "leads": {
            "add": [
              {
                "name": purchaseInfo.name,
                "status_id": '11124741',
                "price": purchaseInfo.price
              }
            ]
          }
        }
      }
    };
    
    let result;
    try {
      result = HTTP.post(newDealUrl, newDealOptions);
      console.log('--- NEW DEAL RESULT ---');
      console.log(result.data.response);
    } catch (error) {
      console.log('--- NEW DEAL ERROR ---');
      result = error;
      console.log(error);
      return error;
    }
    console.log(result.data.response);
    
    dealId = result.data.response.leads.add[0].id;
    console.log(dealId);
    if(dealId){
      amoCrmEditContact(dealId);
    } else {
      return result;
    }
    
  }
}

export function amoCrmEditContact(dealId) {
  if (Meteor.isServer && Meteor.userId() && dealId) {
    
    let userId = Meteor.userId();
    let user = Meteor.users.findOne({_id: userId});
    
    try {
      console.log(user.profile);
    } catch (error) {
      console.log('=== NO USER? ===')
      return error;
    }
    
    let newContactUrl = 'https://winvest.amocrm.ru/private/api/v2/json/contacts/set?type=json';
    let newContactOptions = {
      "data": {
        "USER_LOGIN": 'ilya.karev1000@gmail.com',
        "USER_HASH": '80b3ab5cf5cfda0cc4743d1f996a0e5f',
        "request": {
          "contacts": {
            "update": [
              {
                "id":  user.profile.amoCrm.id,
                "linked_leads_id": [
                  dealId
                ],
                "last_modified":  user.profile.amoCrm.timestamp
              }
            ]
          }
        }
      }
    };
    
    let result;
    try {
      result = HTTP.post(newContactUrl, newContactOptions);
      console.log('--- EDIT CONTACT RESULT ---');
      console.log(result.data.response);
    } catch (error) {
      console.log('--- EDIT CONTACT ERROR ---');
      result = error;
      return error;
    }
    
    console.log(result.data.response);
    timestamp = result.data.response.server_time;
    console.log('timestamp: '+ timestamp);
    if(timestamp){
      Meteor.users.update({_id: this.userId}, {
        $set: {
          'profile.amoCrm': {
            timestamp:timestamp
          }
        }
      });
    }

  } else if (!dealId) {
    console.log('Where is the dealId, dude?');
    return 'Where is the dealId, dude?';
  }
}

export function amoCrmTest() {
  if (Meteor.isServer && Meteor.userId()) {
    console.log('amoCrmTest');
    let testUrl = 'https://winvest.amocrm.ru/private/api/v2/json/accounts/current';
    let testOptions = {
      headers : {
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
