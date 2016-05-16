import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {dictionary} from '../dictionary';
export const Realty = new Mongo.Collection('realty');
export const Parser = new Mongo.Collection('parser');
import {RealtyOperatorSchema} from './schemas/realty-operator.schema';
import {Roles} from 'meteor/alanning:roles'
import {AddressSchema} from './schemas/address.schema';
import {ModeratorSchema} from './schemas/moderator.schema.js';
import {ContactsSchema} from './schemas/contacts.schema';
import {ParseDetailsSchema} from './schemas/parseDetails.schema';
import {RealtyRealtorSchema} from './schemas/realty-realtor.schema';
import {ReportsSchema} from './schemas/reports.schema';
import {RentDetailsSchema} from './schemas/details.schema';
// mongodump -h 127.0.0.1 --port 3001 -d meteor ../db_dump/meteor
// mongorestore -h 127.0.0.1 --port 3001 -d meteor ../db_dump/meteor
import {Meteor} from 'meteor/meteor';

// mongorestore -h 127.0.0.1 --port 27017 -d getrent dump/meteor
// mongodump -h 127.0.0.1 --port 27017 -d getrent dump2/meteor
// db.realty.remove({status: {$ne:'new'}})
Realty.allow({
  update: function () {
    return Roles.userIsInRole(Meteor.userId(), ['business']);
  },
  insert: function () {
    return Roles.userIsInRole(Meteor.userId(), ['business']);
  },
  remove: function () {
    return Roles.userIsInRole(Meteor.userId(), ['business']);
  }
});
Realty.Schema = new SimpleSchema({
  //Это все относится к Карточка которые показываются в Листах
  address: {
    type: AddressSchema
  },
  contacts: {
    type: [ContactsSchema],
    optional: true
  },
  deposit: {  // Залог
    type: Number,
    optional: true
  },
  details: {
    type: RentDetailsSchema,
    optional: true
  },
  floor: {  // Этаж помещения
    type: Number,
    label: 'floor',
    optional: true,
    max: 999
  },
  floormax: {  // Всего этажей
    type: Number,
    label: 'floormax',
    optional: true,
    max: 999
  },
  image: { // картинка главная. появлется в списке
    type: String,
    optional: true
  },
  moderator: { //отчет рекламщика
    type: ModeratorSchema,
    optional: true
  },
  operator: {
    type: RealtyOperatorSchema,
    optional: true
  }, //  TODOD в последнюю очередь реклама, рекламщик, продающий заголовок
  parseDetails: {
    /*когда человек на нашем сайте добавляет этого поля не будет*/
    type: ParseDetailsSchema,
    optional: true
  }, //TODOD в последнюю очередь расписать схему. Может и не надо
  price: {
    type: Number,
    optional: true,
    max: 9999999999
  },
  realtor: {
    type: RealtyRealtorSchema,
    optional: true
  },
  // reports: { // TODO Отчеты о показах. И сами показы. Возможно это надо в отдельную коллекцию. но пока пусть так
  //   type: [ReportsSchema],
  //   // minCount : 1,
  //   maxCount: 100,
  //   optional: true
  // },
  roomcount: {//Количество комнат ['1', '2', '3', '4+']
    type: Number,
    label: 'roomcount',
    allowedValues: dictionary.roomcount.map((item)=> {
      return item.id;
    }),
    optional: true
  },
  square: {  // площадь помещений общая указывает на карточке
    type: Number,
    decimal: true,
    optional: true,
    max: 9999999999
  },//TODO забить на decimal парсить до целых чисел
  status: {
    type: String,
    allowedValues: ['new', 'call', 'later', 'agency', 'analyze', 'list', 'taken', 'sale', 'sold', 'archive', 'trash']
  },
  title: { // Title на авито. Загловок основной.
    type: String,
    optional: true,
    max: 200
  },
  type: {   // Тип продажа вторичка(1) или продажа новостройки(2)  (3)аренда суточно (4) аренда долгосрочно (-1) не удалось определить.
    type: Number,
    max: 5,
    optional: true
  },
  updatedAt: {
    type: Date,
    optional: true
  }
});

//Каждый update  проставляет время udate now
// Realty.before.update(function (userId, doc, fieldNames, modifier) {
//   modifier.$set = modifier.$set || {};
//   modifier.$set.updatedAt = Date.now();
// });

Realty.attachSchema(Realty.Schema);

