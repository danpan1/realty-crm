'use strict';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty/realty.model.js';
import {Roles} from 'meteor/alanning:roles';

Meteor.methods({
  clientAnalytics
});

export function clientAnalytics(price, roomcount, subways, renovation) {
    
    console.log(price);
    console.log(roomcount);
    console.log(subways);
    console.log(renovation);
    
  if (Meteor.isServer && Meteor.userId()) {
      /*
    let maxRoom = (roomcount) => { return Math.max.apply( Math, roomcount ) };
    let minRoom = (roomcount) => { return Math.min.apply( Math, roomcount ) };
*/
    let match1 = {};
    
    /*if(price){
      match1.type = price;
    }*/
    if(roomcount){
      match1.roomcount = {$in: roomcount}; //{ $lte: maxRoom(roomcount), $gte: minRoom(roomcount) };
    }
    if(subways){
      match1["address.subwaysEmbedded.name"] = {$in: subways};
    }
    if(renovation){
      match1["details.renovation"] = {$in: renovation};;
    }
    
    console.log(match1);
    
    let clientAnalytics = Realty.aggregate([{$match : match1}, 
    { 
      $unwind: "$address.subwaysEmbedded" 
    }, {
      $group: {
        _id: { roomcount: "$roomcount", subways: "$address.subwaysEmbedded.name" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
        totalRealty: { $sum: 1 }
      }
    }, {
      $sort: { '_id.roomcount': 1 }
    }]).map((item) => {
      console.log(item.totalRealty);
      return item.avgPrice;
    })
    
    console.log(clientAnalytics);
    return clientAnalytics;
  }
  
}

