/**
 * Created by Danpan on 11.05.16.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const RoboInvoices = new Mongo.Collection('robo_invoices');
const roboSchema = new SimpleSchema({
  _id: {
    type: String
  },
  balanceSmsPhone: {
    type: Number,
    optional: true,
  },
  bulletQty: {
    type: Number,
    optional: true,
  },
  filterId: {
    type: String,
    optional: true,
  },
  createDate: {
    type: Date
  },
  description: {
    type: String
  },
  summ: {
    type: Number,
    decimal: true
  },
  type: { //2 это Зарядить обойму
    type: Number,
    optional: true,
  },
  userId: {
    type: String
  }
});

RoboInvoices.attachSchema(roboSchema);