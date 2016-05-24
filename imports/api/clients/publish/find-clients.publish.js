/**
 * Created by Danpan on 10.05.16.
 */
import {Meteor} from 'meteor/meteor';
import {Clients} from '../clients.model';
import {_} from 'meteor/underscore';
import {Counts} from 'meteor/tmeasday:publish-counts';

if (Meteor.isServer) {

  Meteor.publish('findClients', function (filter, options) {

    // console.log(this.userId);

    if (this.userId) {
      console.log(filter.searchType);
      let selector = {
        status: 'realtor'
      };
      //TODO filter.price  костыль. надо переделать. моргают клиенты лишние при переключнии табов
      if (filter && filter.price) {
        console.log(filter);
        if (filter.price) {
          selector['need.price'] = {$gte: filter.price / 1.25, $lte: filter.price * 4 / 3};
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
        //
        // if (filter.subways) {
        //   selector['need.subways'] = filter.subways;
        // }
        //
        // if (filter.conditions) {
        //   selector['need.conditions'] = filter.conditions;
        // }

        if (filter.searchType === 'my') {
          selector.realtorId = this.userId;
        }

        Counts.publish(this, 'clientsCount', Clients.find(selector), {noReady: true});

        console.log(selector);
        return Clients.find(selector, options);
      }

    }

  });

}
