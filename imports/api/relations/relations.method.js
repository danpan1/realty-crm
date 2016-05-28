/**
 * Created by Danpan on 09.04.16.
 */
'use strict';
import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty';
import {Clients} from '../clients';
import {Relations} from '../relations';

Meteor.methods({
  setRelationFindClient,
  changeRelationTypeInClient
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
    let fieldInRealty, fieldInClient;

    switch (type) {
      case 'my' :
        fieldInRealty = 'relations.my';
        fieldInClient = 'relations.my';
        break;
      case 'algorithm' :
      case 'manual' :
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
export function changeRelationTypeInClient(type, realtyId, clientId, isNew) {
  //Это происходит на странице Объекты - Подобрать объект
  // Значит это предложение для владельцев клиентов
  if (Meteor.isServer && Meteor.userId()) {
    console.log('changeRelationTypeInClient');
    console.log(type, 'type');
    console.log(realtyId, 'realtyId');
    console.log(isNew, 'isNew');
    console.log(clientId, 'clientId');
    let modificator = {};
    if (isNew) {
      modificator.$pull = {'relations.new': realtyId};
    } else {
      modificator.$pull = {'relations.offers': realtyId};
    }

    if (type === 'save') {
      modificator.$addToSet = {'relations.saved': realtyId};
    } else if (type === 'hide') {
      modificator.$pull = {'relations.saved': realtyId};
      modificator.$addToSet = {'relations.hide': realtyId};
    }

    Clients.update({_id: clientId},
      modificator, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('clientRelation  ok');
        }
      });

  }

}
