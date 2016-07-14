'use strict';
import {Meteor} from 'meteor/meteor';
import {Clients} from '../clients.model.js';

Meteor.methods({
  clearRelations
});

export function clearRelations(realtyId, clientId, relationType) {
  console.log(' ====== realtyId: ' + realtyId);
  console.log(' ====== clientId: ' + clientId);
  if (Meteor.isServer) {
    let client = Clients.findOne({_id: clientId});
    if (!client) return 'нет такого клиента';
    if (realtyId) {
      
      let relationIndex;
      console.log(relationType);
      
      if (relationType == 'new') {
        relationIndex = client.relations.new.indexOf(realtyId);
        client.relations.new.splice(relationIndex, 1);
      } else if (relationType == 'saved') {
        relationIndex = client.relations.saved.indexOf(realtyId);
        client.relations.saved.splice(relationIndex, 1);
      } else if (relationType == 'my') {
        relationIndex = client.relations.my.indexOf(realtyId);
        client.relations.my.splice(relationIndex, 1);
      } else if (relationType == 'offers') {
        relationIndex = client.relations.offers.indexOf(realtyId);
        client.relations.offers.splice(relationIndex, 1);
      } else if (relationType == 'hide') {
        relationIndex = client.relations.hide.indexOf(realtyId);
        client.relations.hide.splice(relationIndex, 1);
      }

      Clients.update({_id: clientId}, {
          $set: client
      });
    }
  } else {
    return 'Что-то пошло не так';
  }
}

