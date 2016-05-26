/**
 * @type {Mongo.Collection}
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {clientNeedSchema} from './client-need.schema';
import {RelationsSchema} from '../relations/relations.schema';
import {Roles} from 'meteor/alanning:roles';
import {_} from 'meteor/underscore';
import {Meteor} from 'meteor/meteor';
import {Locations} from '../locations';
export const Clients = new Mongo.Collection('clients');

Clients.allow({
  insert() {
    let userId = Meteor.userId();
    return userId || Roles.userIsInRole(userId, ['staff']);
  },
  update(clientId, client) {
    let userId = Meteor.userId();
    let isOwner;
    if (client) {
      isOwner = (client.realtorId === userId);
    }
    let permission = (userId && isOwner) || Roles.userIsInRole(userId, ['staff']);
    console.log(`update permission = ${permission}`);
    return permission;
  },
  remove() {
    return false;
  }
});

Clients.Schema = new SimpleSchema({
  business: { // чем занимается
    type: String,
    optional: true
  },
  comission: { // размер комиссии
    type: String,
    optional: true
  },
  comissionLoyal: { // платит или нет комиссию
    type: Boolean,
    optional: true
  },
  composition: { // состав ищущих жильё
    type: String,
    optional: true
  },
  createdAt: { // дата созданий
    type: Date,
    optional: true
  },
  modifiedAt: { // дата обновления
    type: Date,
    optional: true
  },
  email: {
    type: String,
    optional: true
  },
  important: {
    type: String,
    optional: true
  },
  name: {
    type: String
  },
  need: { // Сама потребность по объекту
    type: clientNeedSchema,
    optional: true
  },
  note: {
    type: String,
    optional: true
  },
  phone: {
    type: String
  },
  realtor: {
    type:     DBRef.Schema,
    optional: true
  },
  /*
  realtorId: { // Какой риэлтор курирует клиента
    type: String,
    optional: true
  },
  realtorPhone: {
    type: String,
    optional: true
  },
  realtorName: {
    type: String,
    optional: true
  },
  realtorIdShort: {
    type: String,
    optional: true
  },
  */
  relations: { // Связи
    type: [RelationsSchema],
    optional: true
  },
  searchEndDate: { // На когда ищет
    type: Date,
    optional: true
  },
  searchStartDate: { // Когда начал поиск
    type: Date,
    optional: true
  },
  status: {//'realtor' - находится у риэлтора в работе (мои клиенты)
    type: String
  },
  value: {
    type: Number,
    optional: true
  }
});

Clients.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
  console.log(doc.need.subways, 'doc.need.subways');
  let subways = Locations.find({'_id': {$in: doc.need.subways}}).fetch();
  if (subways && subways.length && subways[0].loc.llg) {
    let subwaysInDistance = [];
    subways.forEach((metro) => {
      let foundCloseMetro = Locations.find({
        'loc.llg': {
          $near: {
            $geometry: {type: 'Point', coordinates: metro.loc.llg},
            $maxDistance: 3000
          }
        }
      }).fetch();
      subwaysInDistance = subwaysInDistance.concat(foundCloseMetro);
    });

    console.log('subwaysInDistance', subwaysInDistance);
    let step1 = subwaysInDistance.map((item)=> {
      return item._id;
    });
    console.log('step1', step1.length);
    let step2 = _.uniq(step1, function (item) {
      return item;
    });
    console.log('step2', step2.length);
    doc.need.subwaysInDistance = step2;
  }
});

Clients.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.modifiedAt = Date.now();
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
