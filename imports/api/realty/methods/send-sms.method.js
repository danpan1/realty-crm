'use strict';
import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http'

Meteor.methods({
  sendSms
});

export function sendSms(text) {

  if (Meteor.isServer && Meteor.userId()) {
    
    let url = 'http://sms.ru/sms/send?api_id=EE7347FD-C2D0-0487-C5E0-4FFCD1886275&to=' + text;
    
    HTTP.post(url, false, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });

  }
}