
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {FilterDetailsSchema} from './details.schema';
export const Filters = new Mongo.Collection('filters');

var Schema = {};
Schema.Filters = new SimpleSchema({
  _id: {
    type: String
  },
  filter: {
    type: FilterDetailsSchema
  },
  isActive: {
    type: Boolean
  },
  name: {
    type: String,
    optional: true
  },
  user: {
    type: Object
  },
  'user.id':{
    type: String
  },
  'user.phone':{
    type: String
  },
  isBullet: {
    type: Boolean,
    optional: true
  },
  bullet: {
    type: Object,
    optional: true
  },
  'bullet.type': { // 1,2,3 (количество комнат)
    type: Number,
    optional: true
  },
  'bullet.warhead': {
    type: Number,
    optional: true
  },
  'bullet.dealSpeed': {
    type: Number,
    optional: true
  },
  'bullet.price': { // Цена Одной пули для пополнения через список
    type: Number,
    optional: true
  },
  'bullet.qty': {
    type: Number,
    optional: true
  }
});

Filters.attachSchema(Schema.Filters);
