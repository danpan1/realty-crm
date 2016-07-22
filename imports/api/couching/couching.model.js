
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
export const Couching = new Mongo.Collection('couching');

var Schema = {};
Schema.Couching = new SimpleSchema({
  _id: {
    type: String
  },
  userId:{
    type: String
  },
  lessonNumber: {
    type: Number,
    optional: true
  },
  tasks:{
    type: [Object],
    optional: true
  },
  'tasks.$.id': {
    type:Number,
    optional: true
  },
  'tasks.$.done': {
    type:Boolean,
    optional: true
  },
  'tasks.$.comment': {
    type:String,
    optional: true
  },
  available: {
    type: Boolean,
    optional: true
  },
  done: {
    type: Boolean,
    optional: true
  }
});

const Task = new SimpleSchema({
  id: {
    type:Number,
    optional: true
  },
  done: {
    type:Boolean,
    optional: true
  },
  comment: {
    type:String,
    optional: true
  }
});

Couching.attachSchema(Schema.Couching);

