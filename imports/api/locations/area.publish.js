import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

import {Locations} from './locations.model';

if (Meteor.isServer) {

  Meteor.publish('area', function (id) {

    let selector = {
      _id: id,
      type: 'area'
    };
    return Locations.find(selector);

  });

}
