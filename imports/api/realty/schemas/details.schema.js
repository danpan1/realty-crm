// детальная информация для объекта (аренда)
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {dictionary} from '../../../helpers/dictionary';
const roomSquareSchema = {
    square: Number
} 
export const RentDetailsSchema = new SimpleSchema({
  // Апартаменты
  apartaments: {
    type: Boolean,
    optional: true
  },
  //Балкон
  balcony: {
    type: Number,
    label: 'balcony',
    allowedValues: dictionary.balcony.map(function (item) {
      return item.id;
    }),
    optional: true
  },
  balconGlassed: {
    type: Boolean,
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
  bathQty: {
    type: Number,
    optional: true
  },
  bathCombined: {
    type: Boolean,
    optional: true
  },
  //Коммунальные услуги
  communal: {
    type: Number,
    optional: true
  },
  //Состав съемщиков
  composition: {
    type: Array,
    label: 'composition',
    optional: true
  },
  'composition.$': {
    type: Number,
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
    //allowedValues: dictionary.conditions.map(function (item) {
    //  return item.id;
    //}),
    optional: true
  },
  depositSum: {
    type: Number,
    optional: true
  },
  depositTime: {
    type: Number,
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
  'images.$.md5Hash': {
    type: String,
    optional: true
  },
  'images.$.url': {
    type: String
  },
  'images.$.relative_url': {
    type: String
  },
  'images.$.originalName': {
    type: String
  },
  penthouse: {
    type: Boolean,
    optional: true
  },
  thumbnails: {
    type: [Object],
    label: 'images',
    optional: true
  },
  'thumbnails.$.url': {
    type: String
  },
  'thumbnails.$.relative_url': {
    type: String
  },
  'thumbnails.$.originalName': {
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
    type: String,
    optional: true
  },
  //roomsSquare: {
  //  type: [roomSquareSchema],
  //  label: 'roomsSquare',
  //  optional: true
  //},
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

