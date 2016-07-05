'use strict';
import {Meteor} from 'meteor/meteor';
import {Clients} from '../clients.model.js';

Meteor.methods({
  clearRelations
});

export function clearRelations(realtyId, clientId) {
  console.log(' ====== realtyId: ' + realtyId);
  console.log(' ====== clientId: ' + clientId);
  if (Meteor.isServer) {
    let client = Clients.findOne({_id: clientId});
    if (!client) return 'нет такого клиента';
    if (realtyId) {
      let relationIndex = client.relations.new.indexOf(realtyId);
      if (relationIndex < 0) {
        relationIndex = client.relations.saved.indexOf(realtyId);
        client.relations.saved.splice(relationIndex, 1);
      } else {
        client.relations.new.splice(relationIndex, 1);
      }
      Clients.update({_id: clientId}, {
          $set: client
      });
    }
  } else {
    return 'Что-то пошло не так';
  }
}

