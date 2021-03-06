import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

import {Locations} from './locations.model';

if (Meteor.isServer) {

  Meteor.publish('subwayChips', function (options, searchString, selectedItems) {

    let selector = {
      type: 'subway'
    };

    if (typeof searchString === 'string' && searchString.length) {
      selector.name = {
        $regex: `.*${searchString}.*`,
        $options: 'i'
      };
      let find = Locations.find(selector, options).fetch().map((item) => {return item.name;});
      return Locations.find(selector, options);

    } else if (selectedItems && selectedItems.length) {

      selector._id = {$in: selectedItems};
      return Locations.find(selector, options);

    }

  });

}
