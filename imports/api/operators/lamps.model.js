
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
export const Lamps = new Mongo.Collection('lamps');

var Schema = {};
Schema.Lamps = new SimpleSchema({
  phone: {
    type: Number
  }
});

Lamps.attachSchema(Schema.Lamps);
