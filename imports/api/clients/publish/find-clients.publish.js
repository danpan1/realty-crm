/**
 * Created by Danpan on 10.05.16.
 */
import {Meteor} from 'meteor/meteor';
import {Clients} from '../clients.model';
import {_} from 'meteor/underscore';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {dictionary} from '../../../helpers/dictionary';

if (Meteor.isServer) {

  Meteor.publish('findClients', function (filter, options, relations) {

    console.log('findClients');

    if (this.userId) {

      let clientsRelated = [];
      if (relations && relations.my) {
        clientsRelated = clientsRelated.concat(relations.my);
      }
      if (relations && relations.saved) {
        clientsRelated = clientsRelated.concat(relations.saved);
      }
      if (relations && relations.new) {
        clientsRelated = clientsRelated.concat(relations.new);
      }
      if (relations && relations.offers) {
        clientsRelated = clientsRelated.concat(relations.offers);
      }
      if (relations && relations.hide) {
        clientsRelated = clientsRelated.concat(relations.hide);
      }

      console.log(filter.searchType);

      let selector = {
        status: 'realtor'
      };
      if (clientsRelated && clientsRelated.length) {
        selector._id = {
          $nin: clientsRelated
        };
      }
      //TODO filter.price  костыль. надо переделать. моргают клиенты лишние при переключнии табов
      if (filter && filter.price) {
        // console.log(filter);
        if (filter.price) {
          selector['need.price'] = {$gte: filter.price / 1.25, $lte: filter.price * 4 / 3};
        }
        if (filter.type) {
          selector['need.type'] = filter.type;
        }

        if (filter.roomcount) {
          selector['need.roomcount'] = filter.roomcount;
        }

        // if (filter.metroTime) {
        //   selector['need.metroTime'] = filter.metroTime;
        // }

        // if (filter.metroTransport || filter.metroTransport === 0) {
        //   selector['need.metroTransport'] = filter.metroTransport;
        // }

        if (filter.subways) {
          if (filter.searchType === 'manual') {
            selector['need.subways'] = filter.subways;
          } else {
            selector['need.subwaysInDistance'] = {$in: filter.subways};
          }
        }

        if (filter.conditions && filter.conditions.length) {

          let mappedDictionary = dictionary.conditions.map((item)=> {
            return item.id;
          });
          //Приходится искать от обратного. Ищем по объекту в запросе.
          let ninConditions = mappedDictionary.filter((item)=> {
            if (filter.conditions.indexOf(item) === -1) {
              return true;
            }
            return false;
          });
          if (filter.searchType === 'manual') {
            selector['need.conditions'] = {$nin: ninConditions};
          } else {
            // Тут надо алгоритм такой, что если мебель указана в conditions тогда ищем мебель
          }
        }

        if (filter.searchType === 'my') {
          selector.realtorId = this.userId;
        } else {
          selector.realtorId = {$ne: this.userId};
        }

        Counts.publish(this, 'clientsCount', Clients.find(selector), {noReady: true});

        // console.log(selector);
        return Clients.find(selector, options);
      }

    }
  });
}
