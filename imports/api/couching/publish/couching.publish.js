/**
 * Created by Danpan on 08.04.16.
 */
import {Meteor} from 'meteor/meteor';
import {Couching} from '../couching.model';

if (Meteor.isServer) {
  Meteor.publish('couching', function () {

    let selector = {lessonNumber : 1};
    return Couching.find(selector);
  });
}
