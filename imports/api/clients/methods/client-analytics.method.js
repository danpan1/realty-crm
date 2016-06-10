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
    let match1 = {type:4};
    
    /*if(price){
      match1.type = price;
    }*/
    if(roomcount){
      match1.roomcount = {$in: roomcount}; //{ $lte: maxRoom(roomcount), $gte: minRoom(roomcount) };
    }
    if(subways){
      match1["address.subwaysEmbedded.name"] = {$in: subways};
    }
    /*if(renovation){
      match1["details.renovation"] = {$in: renovation};;
    }*/
    
    
    let clientAnalytics = Realty.aggregate([{$match : match1}, 
    { 
      $unwind: "$address.subwaysEmbedded" 
    }, {
      $group: {
        _id: { roomcount: "$roomcount", subways: "$address.subwaysEmbedded.name" , subwaysLine : "$address.subwaysEmbedded.line" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
        totalRealty: { $sum: 1 }
      }
    }, {
      $sort: { '_id.subways': 1, '_id.roomcount': 1 }
    }])
    
    return clientAnalytics;
  }
  
}

