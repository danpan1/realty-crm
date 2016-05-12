import {SimpleSchema} from 'meteor/aldeed:simple-schema';
export const ContactsSchema = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  whoIs: {
    type: String,
    optional: true
  },
  phones: {
    type: [Object],
    optional: true
  },
  'phones.$.phone': {
    type: String,
    optional: true
  },
  'phones.$.allowCall': {
    type: Number,
    optional: true,
    allowedValues: [0, 1]
  }
});