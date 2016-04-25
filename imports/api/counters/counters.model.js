import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:collection2';

export const Counters = new Mongo.Collection('counters');
var Schemas = {};

Schemas.Counter = new SimpleSchema({
  _id: {
    type: String
  },
  seq: {
    type: Number
  }
});

Counters.attachSchema(Schemas.Counter);
