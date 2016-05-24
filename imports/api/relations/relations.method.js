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

export function setRelation(clientId, realtyId, client) {

  if (Meteor.isServer && Meteor.userId()) {
    console.log('clientId = ', clientId);
    console.log('realtyId = ', realtyId);
    console.log('client = ', client);
    const id = Relations.insert({});
    console.log('Relations = ', id);
    let realtyRelation = {
      _id : id,
      read : !!client,
      hide : false
    };
    let clientRelation = {
      _id : id,
      read : !client,
      hide : false
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
