'use strict';
import {Meteor} from 'meteor/meteor';
import {Users} from '/server/users.model.js';
import {HTTP} from 'meteor/http';
import {Roles} from 'meteor/alanning:roles';
import {_} from 'meteor/underscore';

let Robokassa = require('robokassa');

Meteor.methods({
  roboKassaTest
});

export function roboKassaTest() {
  if (Meteor.isServer && Meteor.userId()) {

    var  r = new Robokassa({login: "1", password: "2"});
    
    r.merchantUrl({ id: "1", summ: 1, description: "no"});
    
    let sum = 1;
    
    let req = {
      OutSum: sum,
      SignatureValue: 450009
    }

    console.log(req);
    
    r.checkPayment(req);

  }
}
