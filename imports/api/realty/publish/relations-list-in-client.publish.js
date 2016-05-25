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
      let realtyRelated = relations.map((item)=> {
        return item.realtyId;
      });
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
