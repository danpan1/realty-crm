/**
 * Created by Danpan on 08.04.16.
 */
import {Meteor} from 'meteor/meteor';
import {Filters} from '../filters.model';

if (Meteor.isServer) {
  Meteor.publish('myFilters', function () {

      let selector = {
        'user.id': this.userId
      };
      
      let options = {
        fields: {
          'name': 1,
          'isActive': 1,
          'filter.conditions': 1, 
          'filter.districts': 1, 
          'filter.floorFrom': 1, 
          'filter.floorTo': 1, 
          'filter.house': 1, 
          'filter.materials': 1, 
          'filter.metroTime': 1, 
          'filter.metroTransport': 1, 
          'filter.priceFrom': 1,
          'filter.priceTo': 1, 
          'filter.renovation': 1, 
          'filter.roomcount': 1, 
          'filter.squareFrom': 1, 
          'filter.squareTo': 1, 
          'filter.street': 1,
          'filter.subways': 1,
        }
      }

      return Filters.find(selector, options);
  });

  Meteor.publish('myBullets', function () {

      let selector = {
        'user.id': this.userId,
        'isBullet': true
      };
      
      let options = {}

      return Filters.find(selector, options);
  });
  
}
