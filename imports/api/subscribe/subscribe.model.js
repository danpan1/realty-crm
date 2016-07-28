
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
export const Subscribe = new Mongo.Collection('subscribe');

var Schema = {};
Schema.Subscribe = new SimpleSchema({
  userId: {
    type: String
  },
  rent: {
    type: SubscribeType,
    optional: true
  },
  sell: {
    type: SubscribeType,
    optional: true
  },
});

const SubscribeType = new SimpleSchema({
  econom:{
    type: SubscribeDetails,
    optional: true
  },
  business:{
    type: SubscribeDetails,
    optional: true
  },
  premium:{
    type: SubscribeDetails,
    optional: true
  },
  all:{
    type: SubscribeDetails,
    optional: true
  }
});


const SubscribeDetails = new SimpleSchema({
  qty:{
    type: Number
  },
  payDate: {
    type: Date
  },
  paid: {
    type: Boolean
  }
});

Subscribe.attachSchema(Schema.Subscribe);