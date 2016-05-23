/**
 * Created by Danpan on 08.04.16.
 */
import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty.model';
import {Cian} from '../../cian';
import {Locations} from '../../locations/locations.model';
import {dictionary} from '../../../helpers/dictionary';
import {_} from 'meteor/underscore';

if (Meteor.isServer) {
  /**
   *
   * @param {object} options - сколько выводить на странице, как сортировать
   * @param {object} client - запросы клиента. параметры по которым ищем
   * @param {string} type - как ищем
   * @returns {*} - возвращает выборку объектов
   *
   * type
   * my - поиск по моим объектам
   * exactly - точное совпадение ( так же используется для модификации фильтра вручную)
   * algorithm - поиск совпадений по расширенному алгоритму
   */
  Meteor.publish('find-realty-by-needs', function (options, client, type) {


      let selector, criterions = [];
      // console.log('listMy');
      if (this.userId && !!client) {
        console.log('options ', options);
        console.log('client ', client);
        console.log('type ', type);

        if (!!client.need.price) {
          criterions.push({price: {$gt: client.need.price * 0.75, $lt: client.need.price * 1.25}});
        }

        if (!!client.need.roomcount) {
          criterions.push({roomCount: {$in: client.need.roomcount}});
        }
        /*
         if (!!client.need.renovation) {
         let renovations = [];
         _.each(dictionary.renovation, function(renovation) {
         if (renovation.id in client.need.renovation) {
         renovations.push(renovation.name);
         }
         });
         console.log(renovations);
         conditions.push({renovation: {$in: renovations}});
         }
         */
        let condition_map = {
          'furniture': "жилая мебель",
          'kitchen_furniture': "кухонная мебель",
          'tv': "телевизор",
          'refrigerator': "холодильник",
          'washer': "стиральная машина",
          'phone': "телефон",
          'animal': "можно с животными",
          'children': "можно с детьми",
        };

        if (!!client.need.conditions) {
          let conditions = [];
          conditions = _.map(client.need.conditions, function (condition) {
            return condition_map[condition];
          });
          criterions.push({conditions: {$all: conditions}});
        }
        if (!!client.need.subways) {
          let subways = client.need.subways;
          let subway_locations = Locations.find({_id: {$in: subways}}).fetch();
          if (subways.length > 0 && subways.length < 5) {
            /*            let subway_additional = [];
             _.each(subway_locations, function(subway_location) {
             subway_additional = Locations.find({}).fetch();
             }
             */
          }
          if (subways.length > 0) {
            let subway_names = [];
            _.each(subway_locations, function (loc) {
              subway_names.push(loc.name);
            });
            criterions.push({metro: {$in: subway_names}});
          }
        }

        /*
         * Поиск только по объектам риэлтора. Страница Подобрать объекта - Мои
         */
        if (type === 'my') {
          criterions.push({'realtor.id': this.userId});
        }

        selector = {
          $and: criterions
        };

        // if (id) {
        //   selector.$and.push({_id: id});
        // }
      }
      console.log('selector ', selector);
      let cian = Cian.find(selector, {limit : 20});
      return cian;
    }
  );
}
