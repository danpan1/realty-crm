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

ClientFilterQuery.Schema = new SimpleSchema({
  roomcount: { //комнат
    type: Array,
    optional: true
  },
  'roomcount.$': { //комнат
    type: String,
    optional: true
  },
  subways: { // Метро
    type: Array,
    optional: true
  },
  'subways.$': { // Метро
    type: String,
    optional: true
  },
  districts: {// районы
    type: Array,
    optional: true
  },
  'districts.$': {// районы
    type: String,
    optional: true
  },
  renovation: {  // Ремонт
    type: Array,
    optional: true
  },
  'renovation.$': {  // Ремонт
    type: Number,
    optional: true
  },
  conditions: {  // Удобства
    type: Array,
    optional: true
  },
  'conditions.$': {  // Удобства
    type: String,
    optional: true
  },
  metroPeshkom: {  // ДО метро пешком TODO пешком или на машине
    type: Number,
    optional: true
  },
  floorFrom: {  // Этаж от
    type: Number,
    optional: true
  },
  floorTo: {  // Этаж до
    type: Number,
    optional: true
  },
  priceFrom: {  // Цена от
    type: Number,
    optional: true
  },
  priceTo: {  // Цена до
    type: Number,
    optional: true
  },
  type:{  //Аренда длительная например
    type: Number,
    optional: true
  },
  materials:{  //Тип дома
    type: Number,
    optional: true
  }
});

ClientFilterQuery.attachSchema(ClientFilterQuery.Schema);
