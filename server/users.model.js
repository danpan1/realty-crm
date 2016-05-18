//// возможно customers и users это одно и то же
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
var Schema = {};

Schema.Users = new SimpleSchema({
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
      else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      }
      else {
        this.unset();
      }
    },
    optional: true
  },
  emails: {
    type: Array,
    optional: true
  },
  'emails.$': {
    type: Object
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  heartbeat: { //TODO danpan : что такое heartbeat ????
    type: Date,
    optional: true
  },
  profile: {
    type: Object,
    optional: true
  },
  'profile.name': {
    type: String,
    optional: true
  },
  'profile.phone': {
    type: String,
    optional: true
  },
  'profile.realtorId': {
    type: String,
    optional: true
  },
  'profile.surName': {
    type: String,
    optional: true
  },
  'profile.urlVk': {
    type: String,
    optional: true
  },
  roles: {
    type: [String],
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

Meteor.users.attachSchema(Schema.Users);
