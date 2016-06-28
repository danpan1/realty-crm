
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
export const Operators = new Mongo.Collection('operators');

Operators.allow({
  insert() {
    let operatorId = Meteor.userId();
  }
});

var Schema = {};
Schema.Operators = new SimpleSchema({
  createdAt: {
    type: Date
  },
  operatorId: {
    type: String
  },
  result: {
    type: Object
  },
  'result.type': {
    type: String
  },
  'result.exclusive': {
    type: Boolean
  },
  'result.comission': {
    type: Boolean
  },
});

Operators.attachSchema(Schema.Operators);
