import { Mongo } from 'meteor/mongo';

export const Realty = new Mongo.Collection('realty');
export const Parser = new Mongo.Collection('parser');

// mongodump -h 127.0.0.1 --port 3001 -d meteor dump/meteor
// mongorestore -h 127.0.0.1 --port 3001 -d meteor dump/meteor

// mongorestore -h 127.0.0.1 --port 27017 -d getrent dump/meteor
// mongodump -h 127.0.0.1 --port 27017 -d getrent dump2/meteor

// Realty.allow({
//   update: function () {
//     return Roles.userIsInRole(Meteor.userId(), ['business']);
//   },
//   insert: function () {
//     return Roles.userIsInRole(Meteor.userId(), ['business']);
//   },
//   remove: function () {
//     return Roles.userIsInRole(Meteor.userId(), ['business']);
//   }
// });

// Realty.Schema = new SimpleSchema({
//   //Это все относится к Карточка которые показываются в Листах
//   address: {
//     type: AddressSchema
//   },
//   contacts: {
//     type: [ContactsSchema]
//   },
//   floor: {  // Этаж помещения
//     type: Number,
//     label: 'floor',
//     optional: true,
//     max: 999
//   },
//   floormax: {  // Всего этажей
//     type: Number,
//     label: 'floormax',
//     optional: true,
//     max: 999
//   },
//   image: { // картинка главная. появлется в списке
//     type: String,
//     optional: true
//   },
//   price: {
//     type: Number,
//     optional: true,
//     max: 9999999999
//   },
//   roomcount: {//Количество комнат ['1', '2', '3', '4+']
//     type: String,
//     label: "roomcount",
//     allowedValues: Meteor.dictionary.roomcount,
//     optional: true
//   }, //TODO количество комнат надо в call center чтобы забивали. Пока отказываем в парсинге
//   square: {  // площадь помещений общая указывает на карточке
//     type: Number,
//     decimal: true,
//     optional: true,
//     max: 9999999999
//   },//TODO забить на decimal парсить до целых чисел
//   title: { // Title на авито. Загловок основной.
//     type: String,
//     optional: true,
//     max: 200
//   },
//   /*ID указывать при рекламе. человек звонит, называет и для ссылок в браузере комбинация чисел и букв 1a3zy  - 60 млн кобинаций*/
//   /*TODO генерация уникальных ID 1a3zy  - 60 млн кобинаций*/
//   ID: {
//     type: Number,
//     max: 999999999,
//     optional: true
//   },
//
//   parseDetails: {
//     /*когда человек на нашем сайте добавляет этого поля не будет*/
//     type: ParseDetailsSchema,
//     optional: true
//   }, //TODOD в последнюю очередь расписать схему. Может и не надо
//
//   status: {
//     type: String,
//     allowedValues: ["new", "call", "later", "agency", "analyze", "list", "taken", "review", "reviewed", "adman", "sale", "sold", "archive", "trash"]
//   },
//   realtor: {
//     type: RealtyRealtorSchema,
//     optional: true
//   },
//   operator: {
//     type: RealtyOperatorSchema,
//     optional: true
//   },
//   ad: { //отчет рекламщика
//     type: AdSchema,
//     optional: true
//   },  //  TODOD в последнюю очередь реклама, рекламщик, продающий заголовок
//   reports: { // TODO Отчеты о показах. И сами показы. Возможно это надо в отдельную коллекцию. но пока пусть так
//     type: [ReportsSchema],
//     // minCount : 1,
//     maxCount: 100,
//     optional: true
//   },
//
//   type: {   // Тип продажа вторичка(1) или продажа новостройки(2)  (3)аренда суточно (4) аренда долгосрочно (-1) не удалось определить.
//     type: Number,
//     max: 5
//   },
//   details: {
//     type: RentDetailsSchema,
//     optional: true
//   },
//   deposit: {  // Залог
//     type: Number,
//     optional: true
//   },
//   updated_at: {
//     type: Date,
//     optional: true
//   }  //TODO Рифат прикрутить autoUpdate записывание sаты
// });
//
// //Каждый update  проставляет время udate now
// Realty.before.update(function (userId, doc, fieldNames, modifier) {
//   modifier.$set = modifier.$set || {};
//   modifier.$set.updated_at = Date.now();
// });

// Realty.attachSchema(Realty.Schema);

