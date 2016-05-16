// детальная информация для объекта (аренда)
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {dictionary} from '../../dictionary';
export const RentDetailsSchema = new SimpleSchema({
  //Балкон
  balcony: {
    type: Number,
    label: 'balcony',
    allowedValues: dictionary.balcony.map(function (item) {
      return item.id;
    }),
    optional: true
  },
  //Саунзел
  bathroom: {
    type: Number,
    label: 'bathroom',
    allowedValues: dictionary.bathroom.map(function (item) {
      return item.id;
    }),
    optional: true
  },
  //Состав съемщиков
  composition: {
    type: Array,
    label: 'composition',
    optional: true
  },
  'composition.$': {
    type: Boolean,
    label: 'composition.[]',
    // // allowedValues: [true, false, null],
    optional: true
  },
  conditions: {
    type: Array,
    label: 'Conditions',
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
  // Описание
  descr: {
    type: String,
    label: 'descr',
    optional: true
  },
  //Лифт
  elevator: {
    type: Number,
    label: 'elevator',
    allowedValues: dictionary.elevator.map(function (item) {
      return item.id;
    }),
    optional: true
  },
  // Грузовой лифт
  elevatorBig: {
    type: Number,
    label: 'Elevator big',
    allowedValues: dictionary.elevator.map(function (item) {
      return item.id;
    }),
    optional: true
  },
  // изображения залитые риэлтором
  images: {
    type: [Object],
    label: 'images',
    optional: true
  },
  'images.$.url': {
    type: String
  },
  'images.$.relative_url': {
    type: String
  },
  //Тип жилья в фильтре
  isNewBuilding: {
    type: Number,
    label: 'isNewBuilding',
    allowedValues: dictionary.isNewBuilding.map(function (item) {
      return item.id;
    }),
    optional: true
  },
  kitchenSquare: {
    type: Number,
    label: 'Living square',
    optional: true
  },
  livingSquare: {
    type: Number,
    label: 'Living square',
    optional: true
  },
  // Лоджия
  loggia: {
    type: Number,
    label: 'loggia',
    allowedValues: dictionary.balcony.map(function (item) {
      return item.id;
    }),
    optional: true
  },
  //Тип строения в фильтре
  materials: {
    type: Number,
    label: 'materials',
    allowedValues: dictionary.materials.map(function (item) {
      return item.id;
    }),
    optional: true
  },
  renovation: {
    type: Number,
    label: 'renovation',
    allowedValues: dictionary.renovation.map(function (item) {
      return item.id;
    }),
    optional: true
  },
  // площадь комнат
  roomsSquare: {
    type: [Number],
    label: 'roomsSquare',
    optional: true
  },
  //Вид из окна в фильтре
  windowView: {
    type: Number,
    label: 'windowView',
    allowedValues: dictionary.windowView.map(function (item) {
      return item.id;
    }),
    optional: true
  }
});

