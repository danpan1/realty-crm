/**
 * Created by Danpan on 06.05.16.
 */
import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

import {ClientFilterQuery} from './client-filter-query.model';

if (Meteor.isServer) {

  Meteor.publish('ClientFilterQueryOneDemonstration', function (realtyInfo) {
    console.log(realtyInfo);
    let selector = {
      roomcount: realtyInfo.roomcount,
      // subways: realtyInfo.subways,
      // districts: realtyInfo.districts,
      // renovation: realtyInfo.renovation,
      // conditions: realtyInfo.conditions,
      metroPeshkom: {$lte : realtyInfo.metroPeshkom},
      floorFrom: {$lte : realtyInfo.floor},
      floorTo: {$gte : realtyInfo.floor},
      priceFrom: {$lte : realtyInfo.price},
      priceTo: {$gte : realtyInfo.price}
    };
    options = {};
    let t = ClientFilterQuery.find(selector, options);
    // console.log(t);
    return t;
  });

}
