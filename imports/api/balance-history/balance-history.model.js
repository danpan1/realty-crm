/**
 * Created by Danpan on 11.05.16.
 */
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const BalanceHistory = new Mongo.Collection('balance_history');
const balanceSchema = new SimpleSchema({
  category: {
    type: String,
    optional: true
  },
  date: {
    type: Date
  },
  description: {
    type: String,
    optional: true
  },
  invoiceId: {
    type: String,
    optional: true
  },
  paymentMethod: {
    type: String,
    optional: true
  },
  plus: {
    type: Boolean
  },
  summ: {
    type: Number
  },
  userId: {
    type: String
  }
});

BalanceHistory.attachSchema(balanceSchema);
