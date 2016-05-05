/**
 * @type {Mongo.Collection}
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:collection2';
export const Clients = new Mongo.Collection('customer');

Clients.Schema = new SimpleSchema({
  phone: {
    type: String,
    optional: false
  },
  password: {
    type: String,
    optional: false
  },
  selections: {
    type: [Object],
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
 * Характер
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