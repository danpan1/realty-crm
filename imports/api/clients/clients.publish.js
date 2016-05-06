/**
 * Created by Danpan on 06.05.16.
 */
import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

import {Clients} from './clients.model';

if (Meteor.isServer) {

  Meteor.publish('clients', function (options, searchString, selectedItems) {

    let selector = {
      type: 'subway'
    };

    if (typeof searchString === 'string' && searchString.length) {
      selector.name = {
        $regex: `.*${searchString}.*`,
        $options: 'i'
      };

      return Clients.find(selector, options);

    } else if (selectedItems && selectedItems.length) {

      selector._id = {$in: selectedItems};
      return Clients.find(selector, options);

    }

  });

}
