
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
    type: String
  },
  user: {
    type: Object
  },
  'user.id':{
    type: String
  },
  'user.phone':{
    type: String
  }
});

Filters.attachSchema(Schema.Filters);
