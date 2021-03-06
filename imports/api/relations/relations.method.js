/**
 * Created by Danpan on 09.04.16.
 */
'use strict';
import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty';
import {Clients} from '../clients';
import {Relations} from '../relations';
import {HTTP} from 'meteor/http';

Meteor.methods({
  setRelationFindClient,
  setRelationFindRealty,
  changeRelationTypeInRealty,
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
        sendSMS('client', clientId);
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
export function setRelationFindRealty(clientId, realtyId, type) {
  //Это происходит на странице Объекты - Подобрать объект
  // Значит это предложение для владельцев клиентов
  if (Meteor.isServer && Meteor.userId()) {
    console.log('setRelationFindRealty');
    console.log('type', type);
    console.log('realtyId', realtyId);
    console.log('clientId', clientId);
    let fieldInRealty, fieldInClient;

    switch (type) {
      case 'clientSuitmy' :
        fieldInRealty = 'relations.my';
        fieldInClient = 'relations.my';
        break;
      case 'clientSuitexact' :
      case 'clientSuitauto' :
        sendSMS('realty', realtyId, this.userId);
        fieldInClient = 'relations.saved';
        fieldInRealty = 'relations.new';
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
export function changeRelationTypeInClient(type, realtyId, clientId, relationTypeCurrent) {
  //Это происходит на странице Объекты - Подобрать объект
  // Значит это предложение для владельцев клиентов
  if (Meteor.isServer && Meteor.userId()) {
    console.log('changeRelationTypeInClient');
    console.log(type, 'type');
    console.log(realtyId, 'realtyId');
    console.log(relationTypeCurrent, 'relationTypeCurrent');
    console.log(clientId, 'clientId');
    let modificator = {};

    if (relationTypeCurrent) {
      modificator.$pull = {};
      modificator.$pull['relations.' + relationTypeCurrent] = realtyId;
    }

    if (type) {
      modificator.$addToSet = {};
      modificator.$addToSet['relations.' + type] = realtyId;
    }
    console.log(modificator, 'modificator');
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
export function changeRelationTypeInRealty(type, realtyId, clientId, relationTypeCurrent) {
  //Это происходит на странице Объекты - Подобрать объект
  // Значит это предложение для владельцев клиентов
  if (Meteor.isServer && Meteor.userId()) {
    console.log('changeRelationTypeInRealty');
    console.log(type, 'type');
    console.log(realtyId, 'realtyId');
    console.log(relationTypeCurrent, 'relationTypeCurrent');
    console.log(clientId, 'clientId');
    let modificator = {};

    if (relationTypeCurrent) {
      modificator.$pull = {};
      modificator.$pull['relations.' + relationTypeCurrent] = realtyId;
    }

    if (type) {
      modificator.$addToSet = {};
      modificator.$addToSet['relations.' + type] = realtyId;
    }
    console.log(modificator, 'modificator');
    Realty.update({_id: realtyId},
      modificator, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('relationTypeCurrent  ok');
        }
      });

  }
}

function sendSMS(type, id, userId) {

  if (Meteor.isServer && Meteor.userId()) {
    console.log('sendSMS');
    console.log('userId', userId);
    let text = '&text=', to = '&to=';
    let noSms = false;
    let currentUser = Meteor.users.findOne({_id: userId});
    console.log(currentUser);
    if (type === 'client') {
      let client = Clients.findOne({_id: id});
      noSms = true;
      to += client.realtorPhone;
      text += `Коллега, я предложил вам объект для клиента id${id}. Предложение на сайте`;
    } else if (type === 'realty') {
      let realty = Realty.findOne({_id: id});
      switch (realty.status) {
        case 'cian':
          let phone = realty.contacts[0].phones[0].phone;
          if (phone) {
            phone = phone.split(';')[0];
          }
          to += phone;
          console.log(phone, 'Этелефон риэлтора');
          text += `Здравствуйте, у меня есть клиенты на ваш объект ${realty.address.street}, ${realty.address.house}. Мой номер ${currentUser.profile.phone}, ваше объявление нашел на сайте`;
          break;
        case 'new':
          noSms = true;
          text += 'НИЧЕГО НЕ ОТПРАВЛЯЕМ НИКОМУ';
          break;
        case 'realtor':
          noSms = true;
          to += realty.realtor.phone;
          text += `Коллега, я предложил вам клиента для вашего объект ${realty.address.value}. Предложение на сайте`;
          break;
      }
    }
    //если новый объект (объект собственника) тогда отбой;
    if (noSms) {
      console.log('если новый объект (объект собственника) тогда отбой');
      return;
    }
    let url = 'http://sms.ru/sms/send?api_id=EE7347FD-C2D0-0487-C5E0-4FFCD1886275' + to + text;
    console.log('SMS SMS SMS ' + url);
    // HTTP.post(url, false, function (error, result) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log(result);
    //   }
    // });
  }
}