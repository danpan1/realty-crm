/**
 * @type {Mongo.Collection}
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {clientNeedSchema} from './client-need.schema';
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
  comission: { // размер комиссии
    type: Number,
    optional: true
  },
  composition: { // состав ищущих жильё
    type: String,
    optional: true
  },
  comissionLoyal: { // платит или нет комиссию
    type: Boolean,
    optional: true
  },
  name: {
    type: String,
    optional: true
  },
  need: { // Сама потребность по объекту
    type: clientNeedSchema,
    optional: true
  },
  phone: {
    type: String,
    optional: true
  },
  realtorId: { // Какой риэлтор курирует клиента
    type: String,
    optional: true
  },
  realtorNote: { // Заметка от риэлтора по клиенту или от колл-центра
    type: String,
    optional: true
  },
  status: {//'realtor' - находится у риэлтора в работе (мои клиенты)
    type: String
  },
  searchEndDate: { // На когда ищет
    type: Date,
    optional: true
  },
  searchStartDate: { // Когда начал поиск
    type: Date,
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
