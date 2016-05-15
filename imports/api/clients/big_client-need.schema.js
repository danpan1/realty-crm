/**
 * Created by Danpan on 26.03.16.
 */
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
/*Тут адрес который показывается на карточках в списках*/
export const clientNeedSchema = new SimpleSchema({
  roomcount: { //комнат
    type: [String],
    optional: true
  },
  'roomcount.$': { //комнат
    type: String,
    optional: true
  },
  subwaysEmbeded: { // Метро заполненное
    type: Array,
    optional: true
  },
  'subwaysEmbeded.$': { // Метро
    type: Object,
    optional: true,
    blackbox: true
  },
  districtsEmbeded: { // Метро заполненное
    type: Array,
    optional: true
  },
  'districtsEmbeded.$': { // Метро
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
  type: {  //Аренда длительная например
    type: Number,
    optional: true
  },
  renovation: {  //Тип дома
    type: Number,
    optional: true
  },
  materials: {  //Тип дома
    type: Number,
    optional: true
  },
  squareTotal: {
    type: Number,
    optional: true
  },
  squareLiving: {
    type: Number,
    optional: true
  },
  squareKitchen: {
    type: Number,
    optional: true
  },
  elevatorSmall: {
    type: Number,
    optional: true
  },
  elevatorBig: {
    type: Number,
    optional: true
  },
  loggia: {
    type: Number,
    optional: true
  },
  balcony: {
    type: Number,
    optional: true
  },
  windowView: {
    type: Number,
    optional: true
  }
});
