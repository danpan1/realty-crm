'use strict';
import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty.model.js';
import {Roles} from 'meteor/alanning:roles';

Meteor.methods({
  objectAnalytics
});

export function objectAnalytics(type, roomcount, subways, materials, renovation, district) {
  
  if (Meteor.isServer && Meteor.userId()) {
    console.log(district, 'district');
    let match1 =  {
      roomcount: roomcount,
      type:type
    };
    if(materials){
      match1["details.materials"] = materials;
    }
    if(renovation){
      match1["details.renovation"] = renovation;
    }
    if(subways){
      match1["address.subwaysEmbedded.name"]= { $in: subways };
    } else if(district){
      match1["address.districtId"] = district;
    }
    console.log(match1, 'match1');
    let realtyAnalytics = Realty.aggregate([{$match : match1}, {
      $unwind: "$address.subwaysEmbedded" 
    }, {
      $group: {
        _id: { roomcount: "$roomcount" },
        avgPrice: { $avg: "$price" },
        // totalRealty: { $sum: 1 }
      }
    }]).map((item) => {
      return item.avgPrice;
    });
    console.log(realtyAnalytics);
    return realtyAnalytics;
  }
  
}

