/**
 * Created by Danpan on 09.04.16.
 */
'use strict';
import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty';
import {Clients} from '../clients';
import {Relations} from '../relations';

Meteor.methods({
  setRelationFindClient
});
/**
 * setRelation - установка связей
 * @param {string} clientId  -
 * @param {string} realtyId  -
 * @param {string} type -
 *          my - из моих клиентов или объектов,
 *          new(новые партнерские) ,
 *          offers - партнерские,
 *          paid - платные от нашего сервиса,
 *          saved - сохраненные,
 *          hide - спрятанные
 */
export function setRelationFindClient(clientId, realtyId, type) {
  //Это происходит на странице Объекты - Подобрать объект
  // Значит это предложение для владельцев клиентов
  if (Meteor.isServer && Meteor.userId()) {
    console.log('setRelationFindClient');
    let fieldInRealty,fieldInClient;

    switch (type) {
      case 'my' :
        fieldInRealty = 'relations.my';
        fieldInClient = 'relations.my';
        break;
      case 'saved' :
        fieldInClient = 'relations.new';
        fieldInRealty = 'relations.saved';
        break;
      default :
        fieldInClient = 'relations.new';
        fieldInRealty = 'relations.saved';
        break;
    }
    let modificatorRealty = {};
    let modificatorClient = {};

    modificatorRealty[fieldInRealty] = clientId;
    modificatorClient[fieldInClient] = realtyId;

    Realty.update({_id: realtyId},
      {
        $addToSet: modificatorRealty
      }, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('realtyRelation  ok');
        }
      });

    Clients.update({_id: clientId},
      {
        $addToSet: modificatorClient
      }, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('clientRelation  ok');
        }
      });

  }

}
