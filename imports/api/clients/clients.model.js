/**
 * @type {Mongo.Collection}
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
export const Clients = new Mongo.Collection('clients');

Clients.allow({
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

Clients.Schema = new SimpleSchema({
  phone: {
    type: String,
    optional: true
  },
  name: {
    type: String,
    optional: true
  },
  status: {//'realtor' - находится у риэлтора в работе (мои клиенты)
    type: String
  },
  comissionLoyal: {
    type: Boolean,
    optional: true
  },
  searchStartDate: {
    type: Date,
    optional: true
  },
  realtorId: {
    type: String,
    optional: true
  },
  realtorNote: {
    type: String,
    optional: true
  },
  roomcount: { //комнат
    type: Array,
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
  materials: {  //Тип дома
    type: Number,
    optional: true
  },
  /**
   * Срочность
   * Вид оплаты
   * Продолжительность поиска
   * Причина долго поиска
   * Индивидуальные особенности
   * Характер клиента
   */
  meta: {
    type: Object,
    optional: true
  }
});
/**
 * filterQuery
 * {"roomcount":["1","2"],"subways":["AHZMJwEyDRWwktCDH"],"districts":["EdhyC9pQm5SHBJZcu"],"renovation":[1,2],
 * "conditions":["tv"],"metroPeshkom":"12","floorFrom":"1","floorTo":"12","priceFrom":"121","priceTo":"22222"}
 * tests
 realtyConditions =['tv', 'washer', 'children']
 client selections : [] - true
 client selections : ['tv'] - true
 client selections : ['tv', 'washer'] - true
 client selections : ['tv', 'washer', 'kid'] - true
 client selections : ['tv', 'washer', 'wi-fi', 'kid'] - false
 client selections : ['wi-fi'] - false
 dictionary = ['furniture', 'kitchen_furniture', 'tv', 'refrigerator', 'washer', 'phone', 'animal', 'children', 'wifi']
 var queryConditions = dictionary.filter(function (value) {return realtyConditions.indexOf(value) === -1})
 query = conditions: {$nin:queryConditions}
 */

Clients.attachSchema(Clients.Schema);
