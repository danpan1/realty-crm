/**
 * Created by Danpan on 10.05.16.
 */
import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty.model';
import {_} from 'meteor/underscore';
import {Counts} from 'meteor/tmeasday:publish-counts';

if (Meteor.isServer) {

  Meteor.publish('relationsListInClient', function (options, relations) {

    // console.log(this.userId);
    // console.log('realtyRelated',relations);

    if (this.userId && relations) {
      let realtyRelated = [];
      
      if (relations.my) {
        realtyRelated = realtyRelated.concat(relations.my);
      }
      if (relations.saved) {
        realtyRelated = realtyRelated.concat(relations.saved);
      }
      if (relations.new) {
        realtyRelated = realtyRelated.concat(relations.new);
      }
      if (relations.offers) {
        realtyRelated = realtyRelated.concat(relations.offers);
      }
      
      // console.log(realtyRelated, 'realtyRelated');
      let selector = {
        _id: {$in: realtyRelated},
        // status: 'realtor'
      };
      console.log('realtyRelated', selector);
      return Realty.find(selector);
    }
  });
}
