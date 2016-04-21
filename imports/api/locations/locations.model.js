import { Mongo } from 'meteor/mongo';

export const Locations = new Mongo.Collection('locations');

Locations.allow({
  insert(userId, party) {
    return true;
  },
  update(userId, party, fields, modifier) {
    return true;
  },
  remove(userId, party) {
    return true;
  }
});
