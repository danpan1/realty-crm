import {SimpleSchema} from 'meteor/aldeed:simple-schema';
export const CouchingSchema = new SimpleSchema({
  lessons: {
    type: Array,
    optional: true
  },
  'lessons.$':{
    type: Object,
    optional: true
  },
  'lessons.$.available': {
    type: Boolean,
    optional: true
  },
  'lessons.$.done': {
    type: Boolean,
    optional: true
  },
  'lessons.$.num': {
    type: Number,
    optional: true
  },
  'lessons.$.tasks': {
    type: [Object],
    optional: true
  }
});