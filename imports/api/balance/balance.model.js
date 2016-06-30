/**
 * Created by Danpan on 11.05.16.
 */
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const Balance = new Mongo.Collection('balance');
const balanceSchema = new SimpleSchema({
  credit: {
    type: Number,
    decimal: true
  },
  current: {
    type: Number,
    decimal: true
  },
  totalPayments: {
    type: Number,
    decimal: true
  },
  historyId: {
    type: String,
    optional: true
  },
  userId: {
    type: String
  }
});

Balance.attachSchema(balanceSchema);

/*
{
  credit : 0 ,
  current : 10000,
  totalPayments : 10000,
  historyId : 'asd'
  userId : 'Kk4igJhPCuyBhqQyx'
}
*/
