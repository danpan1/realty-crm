/**
 * Created by Danpan on 26.03.16.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
export const ClientFilterQuery = new Mongo.Collection('clientFilterQuery');

ClientFilterQuery.allow({
  insert() {
    return true;
  },
  update(userId, party, fields, modifier) {
    return userId && party.owner === userId;
  },
  remove(userId, party) {
    return userId && party.owner === userId;
  }
});

ClientFilterQuery.Schema = new SimpleSchema();

ClientFilterQuery.attachSchema(ClientFilterQuery.Schema);
