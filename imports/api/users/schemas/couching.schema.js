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
    type: [TaskSchema],
    optional: true
  }
});

const TaskSchema = new SimpleSchema({
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