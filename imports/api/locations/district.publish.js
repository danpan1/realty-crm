import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

import {Locations} from './locations.model';

if (Meteor.isServer) {

  Meteor.publish('district', function (options, searchString, selectedItem) {

    let selector = {
      type: 'district'
    };
    console.log(selectedItem, 'selectedItem');
    if (typeof searchString === 'string' && searchString.length) {
      selector.name = {
        $regex: `.*${searchString}.*`,
        $options: 'i'
      };

      return Locations.find(selector, options);

    } else if (typeof selectedItem === 'string' && selectedItem.length) {

      selector._id = selectedItem;
      return Locations.find(selector, options);

    }

  });

}
