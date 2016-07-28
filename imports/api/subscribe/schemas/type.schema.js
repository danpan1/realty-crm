import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const SubscribeTypeSchema = new SimpleSchema({
  econom:{
    type: Object,
    optional: true
  },
  'econom.qty':{
    type: Number,
    optional: true
  },
  'econom.payDate': {
    type: Date,
    optional: true
  },
  'econom.paid': {
    type: Boolean,
    optional: true
  },
  business:{
    type: Object,
    optional: true
  },
  'business.qty':{
    type: Number,
    optional: true
  },
  'business.payDate': {
    type: Date,
    optional: true
  },
  'business.paid': {
    type: Boolean,
    optional: true
  },
  premium:{
    type: Object,
    optional: true
  },
  'premium.qty':{
    type: Number,
    optional: true
  },
  'premium.payDate': {
    type: Date,
    optional: true
  },
  'premium.paid': {
    type: Boolean,
    optional: true
  },
  all:{
    type: Object,
    optional: true
  },
  'all.qty': {
    type: Number,
    optional: true
  },
  'all.payDate': {
    type: Date,
    optional: true
  },
  'all.paid': {
    type: Boolean,
    optional: true
  },
});

/*
export const Object = new SimpleSchema({
  qty:{
    type: Number
  },
  payDate: {
    type: Date
  },
  paid: {
    type: Boolean
  }
});*/