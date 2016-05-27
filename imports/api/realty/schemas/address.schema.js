/**
 * Created by Danpan on 26.03.16.
 */
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
/*Тут адрес который показывается на карточках в списках*/
export const AddressSchema = new SimpleSchema({
  areaId: {
    type: String,
    optional: true
  },
  areaName: {
    type: String,
    optional: true
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  dadata: { // Full data из дадаты . Id карточки. Будем хранить в отдельной коллекции
    type: String,
    optional: true
  },
  districtId: {
    type: String,
    optional: true
  },
  districtName: {
    type: String,
    optional: true
  },
  flat: {
    type: String,
    optional: true
  },
  loc: { // Координаты
    type: [Number],
    optional: true,
    decimal : true
  },
  house: {
    type: String
  },
  metroTransport: {
    type: Number,
    optional: true
  },
  metroTime: {
    type: String,
    optional: true
  },
  street: {
    type: String,
    optional: true
  },
  streetFiasId: { // Правильный поиск по комбинации streetFiasId + номер дома (улицы меняют названия, дома меняют Id)
    type: String,
    optional: true
  },
  subways: { // ID метро
    type: [String],
    optional: true
  },
  subwaysEmbedded: { // Линия и Название метро
    type: Array,
    optional: true
  },
  'subwaysEmbedded.$': { // ID метро
    type: Object,
    optional: true,
    blackbox: true
  },
  value: {
    type: String
  }
});
