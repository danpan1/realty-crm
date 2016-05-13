/**
 * Created by Danpan on 11.05.16.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const Agents = new Mongo.Collection('agents');
Agents.Schema = new SimpleSchema({
  name: {
    type: String,
    optional: true,
    max: 100
  },
  phone:{
    type: String,
    optional: true,
    max: 100
  },
  realtyId:{
    type: String,
    optional: true,
    max: 100
  },
  realtyPhone:{
    type: String,
    optional: true,
    max: 100
  },
  realtyName:{
    type: String,
    optional: true,
    max: 100
  }
});

Agents.attachSchema(Agents.Schema);
