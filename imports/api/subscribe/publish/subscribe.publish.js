/**
 * Created by Danpan on 08.04.16.
 */
import {Meteor} from 'meteor/meteor';
import {Subscribe} from '../subscribe.model';

if (Meteor.isServer) {
  Meteor.publish('mySubscribes', function () {

      let selector = {
        'userId': this.userId
      };

      return Subscribe.find(selector, {});
  });
  
}
