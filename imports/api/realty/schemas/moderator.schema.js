/**
 * Created by Danpan on 26.03.16.
 */
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const ModeratorSchema = new SimpleSchema({
  id: { //id
    type: String,
    optional : true
  },
  comment:{
    type: Object,
    optional : true
  },
  'comment.photo':{
    type: String,
    optional : true
  },
  'comment.description':{
    type: String,
    optional : true
  },
  date:{
    type: Date,
    optional: true
  },
  percent:{
    type: Object,
    optional: true
  },
  'percent.advertisement': {
    type: Number,
    optional: true
  },
  'percent.description': {
    type: Number,
    optional: true
  },
  'percent.photo': {
    type: Number,
    optional: true
  },
  'percent.total': {
    type: Number,
    optional: true
  }
});
