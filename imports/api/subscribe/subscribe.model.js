
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {SubscribeTypeSchema} from './schemas/type.schema';
export const Subscribe = new Mongo.Collection('subscribe');

var Schema = {};
Schema.Subscribe = new SimpleSchema({
  userId: {
    type: String
  },
  rent: {
    type: SubscribeTypeSchema,
    optional: true
  },
  sell: {
    type: SubscribeTypeSchema,
    optional: true
  },
});

/*
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
    type: Number,
    optional: true
  },
  payDate: {
    type: Date,
    optional: true
  },
  paid: {
    type: Boolean,
    optional: true
  }
});*/

Subscribe.attachSchema(Schema.Subscribe);