'use strict';
import {Meteor} from 'meteor/meteor';
import {Subscribe} from '../subscribe.model.js';

Meteor.methods({
  checkSubscribe,
  insertSubscribe
});


export function checkSubscribe () {

  if (Meteor.isServer && Meteor.userId()) {

    let oldSubscribe = Subscribe.findOne({userId:this.userId});
    return oldSubscribe;

  }

}

export function insertSubscribe (subscribe) {
  
  if (Meteor.isServer && Meteor.userId()) {

   let oldSubscribe = Subscribe.findOne({userId:this.userId});
   
   if (oldSubscribe) { // Если старая подписка есть, заливаем новую подписку выборочно
     console.log('oldSubscribe: '+oldSubscribe._id)
     if (subscribe.rent) { // Если в новой подписке есть аренда
       if (!oldSubscribe.rent) { // Если нет аренды в старой подписке, заливаем новую аренду полностью
         Subscribe.update({userId:this.userId},{
           $set: {rent: subscribe.rent}
         }, (err, result) => {
           if (err) { console.log('SUBSCRIBE UPDATE ERROR'); console.log(err); }
         })
       } else {  // Если есть аренла в старой подписке, заливаем новую аренду выборочно
         let newDetails = {};
         if (subscribe.rent.econom) {
           newDetails.econom = subscribe.rent.econom;
         } else if (oldSubscribe.rent.econom) {
           newDetails.econom = oldSubscribe.rent.econom;
         }
         if (subscribe.rent.business) {
           newDetails.business = subscribe.rent.business;
         } else if (oldSubscribe.rent.business) {
           newDetails.business = oldSubscribe.rent.business;
         }
         if (subscribe.rent.premium) {
           newDetails.premium = subscribe.rent.premium;
         } else if (oldSubscribe.rent.premium) {
           newDetails.premium = oldSubscribe.rent.premium;
         }
         if (subscribe.rent.all) {
           newDetails.all = subscribe.rent.all;
         } else if (oldSubscribe.rent.all) {
           newDetails.all = oldSubscribe.rent.all;
         }
         Subscribe.update({userId:this.userId},{
           $set: {rent: newDetails}
         });
       }
     } else if (subscribe.sell) { // Если в новой подписке есть продажа
         if (!oldSubscribe.sell) { // Если нет продажи в старой подписке, заливаем новую продажу полностью
         Subscribe.update({userId:this.userId},{
           $set: {sell: subscribe.sell}
         }, (err, result) => {
           if (err) { console.log('SUBSCRIBE UPDATE ERROR'); console.log(err); }
         })
       }  else { // Если есть продажа в старой подписке, заливаем новую продажу выборочно
         let newDetails = {};
         if (subscribe.sell.econom) {
           newDetails.econom = subscribe.sell.econom;
         } else if (oldSubscribe.sell.econom) {
           newDetails.econom = oldSubscribe.sell.econom;
         }
         if (subscribe.sell.business) {
           newDetails.business = subscribe.sell.business;
         } else if (oldSubscribe.sell.business) {
           newDetails.business = oldSubscribe.sell.business;
         }
         if (subscribe.sell.premium) {
           newDetails.premium = subscribe.sell.premium;
         } else if (oldSubscribe.sell.premium) {
           newDetails.premium = oldSubscribe.sell.premium;
         }
         if (subscribe.sell.all) {
           newDetails.all = subscribe.sell.all;
         } else if (oldSubscribe.sell.all) {
           newDetails.all = oldSubscribe.sell.all;
         }
         Subscribe.update({userId:this.userId},{
           $set: {sell: newDetails}
         });
       }
     }

   } else { // Если старой подписки нет, заливаем всю новую подписку

     let newSubscribe = subscribe;
     newSubscribe.userId = this.userId;
     
     console.log('newSubscribe');
     console.log(newSubscribe);
     
     Subscribe.insert(newSubscribe, (error) => {
       if (error) {
         console.log(error);
       } else {
         console.log(`Subscribe added : id=${subscribe._id}`);
       }
     });

   }
   
  }
  
}