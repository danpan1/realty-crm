/**
 * Created by Danpan on 08.04.16.
 */
import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty.model';
import {dictionary} from '../../../helpers/dictionary';
import {_} from 'meteor/underscore';
import {Counts} from 'meteor/tmeasday:publish-counts';

if (Meteor.isServer) {
  /**
   *
   * @param {object} options - сколько выводить на странице, как сортировать
   * @param {object} client - запросы клиента. параметры по которым ищем
   * @param {string} type - как ищем
   * @returns {*} - возвращает выборку объектов
   */
  Meteor.publish('findRealtyByNeeds', function (options, clientNeeds, relations, suitby) {


      // let selector, criterions = [];
      console.log('findRealtyByNeeds');

      if (this.userId) {

        let selector = {
          status: {$in: ['realtor', 'agency', 'ocean', 'taken']}
          // status: {$in: [/*'realtor', 'agency',*/ 'ocean']}
        };

        let realtyRelated = [];
        if (relations && relations.my) {
          realtyRelated = realtyRelated.concat(relations.my);
        }
        if (relations && relations.saved) {
          realtyRelated = realtyRelated.concat(relations.saved);
        }
        if (relations && relations.new) {
          realtyRelated = realtyRelated.concat(relations.new);
        }
        if (relations && relations.offers) {
          realtyRelated = realtyRelated.concat(relations.offers);
        }

        if (relations && relations.hide) {
          realtyRelated = realtyRelated.concat(relations.hide);
        }

        if (realtyRelated && realtyRelated.length) {
          selector._id = {
            $nin: realtyRelated
          };
        }

        //TODO моргают клиенты лишние при переключнии табов
        if (clientNeeds) {
          if (clientNeeds.type) {
            selector['type'] = clientNeeds.type;
          }
          if (clientNeeds.price) {
            selector['price'] = {$gte: clientNeeds.price / 1.25, $lte: clientNeeds.price * 4 / 3};
          }

          if (clientNeeds.roomcount && clientNeeds.roomcount.length > 0) {
            selector['roomcount'] = {$in: clientNeeds.roomcount};
          }

          if (clientNeeds.subways) {
            if (suitby === 'exact') {
              selector['address.subways'] = {$in: clientNeeds.subways};
            } else {
              if (clientNeeds.subwaysInDistance) selector['address.subways'] = {$in: clientNeeds.subwaysInDistance};
            }
          }

          if (clientNeeds.conditions && clientNeeds.conditions.length) {

            if (suitby === 'exact') {
              selector['details.conditions'] = {$all: clientNeeds.conditions};
            } else {
              // Тут надо алгоритм такой, что если мебель указана в conditions тогда ищем мебель
            }
          }

          if (suitby === 'my') {
            selector['realtor.id'] = this.userId;
          } else {
            selector['realtor.id'] = {$ne: this.userId};
          }

          Counts.publish(this, 'realtyCount', Realty.find(selector), {noReady: true});

          let realty = Realty.find(selector, options);
          console.log('realty length: ', realty.length);
          return realty;
        }
        console.log('no clientNEEDS');
      }
      console.log('no userId');

    }
  );
}
