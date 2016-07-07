/**
 * Created by Danpan on 11.05.16.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const RoboInvoices = new Mongo.Collection('robo_invoices');
const roboSchema = new SimpleSchema({
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
  userId: {
    type: String
  }
});

RoboInvoices.attachSchema(roboSchema);