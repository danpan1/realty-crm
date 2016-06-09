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

export function objectAnalytics(type, roomcount, subways, materials, renovation) {
  
  if (Meteor.isServer && Meteor.userId()) {

    let match1 =  {
      "address.subwaysEmbedded.name": { $in: subways },
      roomcount: roomcount,
      type:type
    };
    if(materials){
      match1["details.materials"] = materials;
    }
    if(renovation){
      match1["details.renovation"] = renovation;
    }

    let realtyAnalytics = Realty.aggregate([{$match : match1}, {
      $unwind: "$address.subwaysEmbedded" 
    }, {
      $group: {
        _id: { roomcount: "$roomcount", subways: "$address.subwaysEmbedded.name" },
        avgPrice: { $avg: "$price" },
        totalRealty: { $sum: 1 }
      }
    },{
      $sort: { '_id.roomcount': 1 }
    }]).map((item) => {
      return item.avgPrice;
    })
    
    return realtyAnalytics;
  }
  
}

