// детальная информация для объекта (аренда)
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {dictionary} from '../../helpers/dictionary';

export const FilterDetailsSchema = new SimpleSchema({
  conditions: {
    type: Array,
    optional: true
  },
  'conditions.$': {
    type: String,
    label: 'Conditions.[]',
    allowedValues: dictionary.conditions.map(function (item) {
      return item.id;
    }),
    optional: true
  },
  districts: {// районы
    type: [String],
    optional: true
  },
  floorFrom: {  // Цена
    type: Number,
    optional: true
  },
  floorTo: {  // Цена
    type: Number,
    optional: true
  },
  house: {
    type: String,
    optional: true
  },
  //Тип строения в фильтре
  materials: {
    type: [Number],
    optional: true
  },
  metroTime: {
    type: Number,
    optional: true
  },
  metroTransport: {
    type: String,
    optional: true
  },
  priceFrom: {  // Цена
    type: Number,
    optional: true
  },
  priceTo: {  // Цена
    type: Number,
    optional: true
  },
  renovation: {// ремонт
    type: [Number],
    optional: true
  },
  roomcount: { //комнат
    type: [Object],
    optional: true
  },
  'roomcount.$.id': {
    type: Number,
    optional: true
  },
  'roomcount.$.name': {
    type: String,
    optional: true
  },
  squareFrom: {  // Цена
    type: Number,
    optional: true
  },
  squareTo: {  // Цена
    type: Number,
    optional: true
  },
  street: {
    type: String,
    optional: true
  },
  subways: { // Метро
    type: [String],
    optional: true
  }
});

