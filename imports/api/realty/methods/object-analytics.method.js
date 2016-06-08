/**
 * Created by Danpan on 23.03.16.
 */
'use strict';
import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty.model.js';
import {Roles} from 'meteor/alanning:roles';

Meteor.methods({
  objectAnalytics
});

export function objectAnalytics(roomcount, subways, materials, renovation) {
  
  console.log(materials);
  console.log(renovation);
  
  if (Meteor.isServer && Meteor.userId()) {

    let realtyAnalytics = Realty.aggregate([{
      $match: {
        "address.subwaysEmbedded.name": { $in: subways },
        roomcount: roomcount/*,
        materials: materials,
        renovation: renovation*/
      }
    }, { 
      $unwind: "$address.subwaysEmbedded" 
    }, {
      $group: {
        _id: { roomcount: "$roomcount", subways: "$address.subwaysEmbedded.name" },
        avgPrice: { $avg: "$price" },
        //minPrice: { $min: "$price" },
        //maxPrice: { $max: "$price" },
        totalRealty: { $sum: 1 }
      }
    },{
      $sort: { '_id.roomcount': 1 }
    }]).map((item) => {
      console.log('totalRealty: ' + item.totalRealty);
      return item.avgPrice;
    })
    return realtyAnalytics;
  }
  
}
