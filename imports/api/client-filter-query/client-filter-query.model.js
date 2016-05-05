/**
 * Created by Danpan on 26.03.16.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:collection2';
export const ClientFilterQuery = new Mongo.Collection('clientFilterQuery');
ClientFilterQuery.Schema = new SimpleSchema({
  roomcount: { //комнат
    type: Array,
    optional: true
  },
  subways: { // Метро
    type: Array,
    optional: true
  },
  districts: {// районы
    type: Array,
    optional: true
  },
  renovation: {  // Ремонт
    type: Array,
    optional: true
  },
  conditions: {  // Удобства
    type: Array,
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
