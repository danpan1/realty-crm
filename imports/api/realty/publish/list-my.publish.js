/**
 * Created by Danpan on 08.04.16.
 */
import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty.model';
import {_} from 'meteor/underscore';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {Roles} from 'meteor/alanning:roles';

if (Meteor.isServer) {
  Meteor.publish('listMy', function (options, details, id) {

      let selector;
      // console.log('listMy');
      if (Roles.userIsInRole(this.userId, ['realtor'])) {

        selector = {
          $and: [
            {'realtor.id': this.userId},
            {status: {$in: ['sale', 'taken', 'review', 'reviewed']}}
          ]
        };

        if (id) {
          selector.$and.push({_id: id});
        }
        Counts.publish(this, 'realtyCount', Realty.find(selector), {noReady: true});
      }
      //Отдаем объекты недвижимости если у юзера есть роль бизнес
      if (Roles.userIsInRole(this.userId, ['business'])) {
        if (!details) {
          options.fields = {
            'address.house': 1,
            'address.flat': 1,
            'address.street': 1,
            'moderator.percent.total': 1,
            image: 1,
            price: 1,
            // realtor: 1,
            // reports: 1,
            roomcount: 1,
            status: 1,
            title: 1
          };
        }
        // console.log(selector);
        return Realty.find(selector, options);
      }

    }
  );
}
