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
  name:{
    type: String,
    optional: true
  },
  filterQueryIds:{
    type: Array,
    optional: true
  },
  'filterQueryIds.$':{
    type: String,
    optional: true
  },
  comissionLoyal: {
    type: Boolean,
    optional: true
  },
  searchStartDate:{
    type: Date,
    optional: true
  },
  realtorId:{
    type: String,
    optional: true
  },
  realtorNote:{
    type: String,
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
