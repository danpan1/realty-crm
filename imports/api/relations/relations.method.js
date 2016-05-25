/**
 * Created by Danpan on 09.04.16.
 */
'use strict';
import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty';
import {Clients} from '../clients';
import {Relations} from '../relations';

Meteor.methods({
  setRelation
});

export function setRelation(clientId, realtyId) {
  //Это происходит на странице Объекты - Подобрать объект
  // Значит это предложение для владельцев клиентов
  if (Meteor.isServer && Meteor.userId()) {
    console.log('clientId = ', clientId);
    console.log('realtyId = ', realtyId);
    const id = Relations.insert({});
    console.log('Relations = ', id);

    let realtyRelation = {
      _id: id,
      answer: null,
      clientId: clientId,
      createdAt : new Date(),
      hide: false,
      isOffer: false,
      read: true,
      realtyId: realtyId
    };

    let clientRelation = {
      _id: id,
      answer: null,
      clientId: clientId,
      createdAt : new Date(),
      hide: false,
      isOffer: true,
      read: false,
      realtyId: realtyId
    };

    Realty.update({_id: realtyId},
      {
        $addToSet: {relations: realtyRelation}
      }, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('realtyRelation  ok');
        }
      });

    Clients.update({_id: clientId},
      {
        $addToSet: {relations: clientRelation}
      }, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('clientRelation  ok');
        }
      });

  }

}
