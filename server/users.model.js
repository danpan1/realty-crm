//// возможно customers и users это одно и то же
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
//import {CouchingSchema} from '../imports/api/users/schemas/couching.schema';
//import {OperatorSchema} from '../imports/api/users/schemas/operator.schema';
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
  'profile.balance': {
    type: Number,
    decimal: true,
    optional: true
  },
  'profile.city': {
    type: String,
    optional: true
  },
  'profile.getSmsPremiumObjects': {
    type: Boolean,
    optional: true
  },
  'profile.name': {
    type: String,
    optional: true
  },
  //'profile.operator': {
  //  type: OperatorSchema,
  //  optional: true
  //},
  'profile.phone': {
    type: String
  },
  'profile.realtorId': {
    type: String,
    optional: true
  },
  'profile.photo': {
    type: Boolean,
    optional: true
  },
  'profile.subways': {
    type: Object,
    optional: true
  },
  'profile.subways.list': {
    type: [String],
    optional: true
  },
  'profile.subways.embedded': {
    type: Array,
    optional: true
  },
  'profile.subways.embedded.$': { // ID метро
    type: Object,
    optional: true,
    blackbox: true
  },
  'profile.surName': {
    type: String,
    optional: true
  },
  'profile.urlVk': {
    type: String,
    optional: true
  },
  'profile.amoCrm': {
    type: Object,
    optional: true
  },
  'profile.amoCrm.id': {
    type: String,
    optional: true
  },
  'profile.amoCrm.timestamp': {
    type: Number,
    optional: true
  },
  'profile.getResponse': {
    type: Object,
    optional: true
  },
  'profile.getResponse.rieltor_guru': {
    type: Boolean,
    optional: true
  },
  'profile.getResponse.rieltor_guru_clients': {
    type: Boolean,
    optional: true
  },
  //'profile.couching': {
  //  type: CouchingSchema,
  //  optional: true
  //},
  takenRealty: {
    type: Number,
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
