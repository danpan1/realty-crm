import {AddressSchema} from './schemas/address.schema';
import {ContactsSchema} from './schemas/contacts.schema';
import {dictionary} from '../../helpers/dictionary';
import {Meteor} from 'meteor/meteor';
import {ModeratorSchema} from './schemas/moderator.schema.js';
import {Mongo} from 'meteor/mongo';
import {ParseDetailsSchema} from './schemas/parseDetails.schema';
import {RealtyOperatorSchema} from './schemas/realty-operator.schema';
import {RealtyRealtorSchema} from './schemas/realty-realtor.schema';
import {RentDetailsSchema} from './schemas/details.schema';
import {Roles} from 'meteor/alanning:roles';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const Parser = new Mongo.Collection('parser');
export const Realty = new Mongo.Collection('realty');
// mongodump -h 127.0.0.1 --port 3001 -d meteor ../db_dump/meteor
// mongorestore -h 127.0.0.1 --port 3001 -d meteor ../db_dump/meteor

Realty.allow({
  update: function (realtyId, realty) {
    let userId = Meteor.userId();
    let isOwner;
    if (realty.realtor) {
      isOwner = (realty.realtor.id === userId);
    }
    let permission = (userId && isOwner) || Roles.userIsInRole(userId, ['staff']);
    console.log(`update permission = ${permission}`);
    return permission;
  },
  insert: function () {
    let userId = Meteor.userId();
    return userId || Roles.userIsInRole(userId, ['staff']);
    ;
  },
  remove: function () {
    return false;
  }
});
Realty.Schema = new SimpleSchema({
  //Это все относится к Карточка которые показываются в Листах
  address: {
    type: AddressSchema
  },
  comission: { // размер комиссии
    type: String,
    optional: true
  },
  comissionLoyal: { // платит или нет комиссию
    type: Boolean,
    optional: true
  },
  contacts: {
    type: [ContactsSchema],
    optional: true
  },
  createdAt: {
    type: Date,
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
  modifiedAt: {
    type: Date,
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
  relations: {
    type: [Object],
    optional: true
  },
  'relations.$._id':{
    type: String,
    optional: true
  },
  'relations.$.read':{
    type: Boolean,
    optional: true
  },
  'relations.$.hide':{
    type: Boolean,
    optional: true
  }, /// TODO сделать статусы ['offer', 'offered', inwork, reject, hide, read]??? пока хз
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
  }
});

Realty.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
});

Realty.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.modifiedAt = Date.now();
});
//Каждый update  проставляет время udate now
// Realty.before.update(function (userId, doc, fieldNames, modifier) {
//   modifier.$set = modifier.$set || {};
//   modifier.$set.updatedAt = Date.now();
// });

Realty.attachSchema(Realty.Schema);

