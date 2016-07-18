/**
 * Created by Danpan on 09.04.16.
 */
'use strict';
import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty.model.js';
import {Balance} from '/imports/api/balance';
import {Dadata} from '/imports/api/dadata';
import {Locations} from '/imports/api/locations';
import {_} from 'meteor/underscore';
import {Roles} from 'meteor/alanning:roles';
import nextAutoincrement from '../../../helpers/getUniqueId';
import {setRedisKey} from '../../../redis/redis-SET-DEL';
import {delRedisKey} from '../../../redis/redis-SET-DEL';

Meteor.methods({
  addRealty,
  buyRealtyOcean,
  showRealtyDetails,
  updateRealty,
  removeRealty
});

/**
 * takeRealty - взять объект недвижимости. Кнопка взять на странице Новые объекты.
 * @param realtyId
 */

export function buyRealtyOcean(realtyId, realtyPrice, setStatus) {

  if (!(Meteor.isServer && this.userId)) {
    throw new Meteor.Error('logged-out', 'The user must be logged in to take realty.');
  }

  const userId = this.userId;
  console.log('call redis userId =', userId, 'realtyId = ', realtyId);
  //todo timer 150 на процедуру иначе отбой

  let realty = Realty.findOne({_id: realtyId});
  let oldStatus = realty.status;

  // Проверяем, не находится ли объект в связях у клиента.
  if (oldStatus != 'connection' || realty.realtor.id != userId) {

    if (!setRedisKey(realtyId)) {
      throw new Meteor.Error('Объект заблокирован', 'Кто-то уже взял этот объект. Неизвестно, этот юзер или другой');
    }
    if (!setRedisKey(userId)) {
      delRedisKey(realtyId);
      throw new Meteor.Error('Баланс пользователя заблокирован', 'Нельзя совершать 2 операции покупки одновременно. Завершите первую операцию');
    }

    Realty.update({_id: realtyId}, {$set: {status: 'transaction', transactionUser: this.userId}}); // transactionUser нужен, чтобы объект не исчезал из океана юзера, совершающего транзакцию, на время транзакции

    //todo price опеределить по параметрамs
    let price = realtyPrice || 60;

    // Объект должен добавляться либо из Океана, либо из связей (тогда аргумент setStatus будет connection или taken)
    if ((oldStatus !== 'ocean' && (setStatus !== 'connection' && setStatus !== 'taken')) || (realty.realtor && realty.realtor.id)) {
      buyOceanBackwardsCommits(1);
      throw new Meteor.Error('объект добавляется из неизвестного места');
    }

    // УДАЛИТЬ 20.07.2016
    /*if (realty.type === 4 && !Roles.userIsInRole(Meteor.userId(), 'paid')) {
      buyOceanBackwardsCommits(1);
      throw new Meteor.Error('надо оплатить подписку на аренду');
    }
    if (realty.type === 1 && !Roles.userIsInRole(Meteor.userId(), 'paidSale')) {
      buyOceanBackwardsCommits(1);
      throw new Meteor.Error('надо оплатить подписку на продажу');
    }*/

    /*   ОПЛАТА  */
    Balance.update({userId: userId}, {$inc: {current: -price}});
    /*проверяем положительный баланс*/
    if (Balance.findOne({userId: userId}).current < 0) {
      buyOceanBackwardsCommits(2);
      throw new Meteor.Error('Недостаточно средств');
    }

  }
  /*Успешно прошла вся транзакция приписывает объект риэлтору */
  if(setStatus == 'connection') 
    Realty.update({_id: realtyId}, {$set: {status: 'connection', transactionUser: '', 'realtor.id': userId}}); 
  else 
    Realty.update({_id: realtyId}, {$set: {status: 'taken', transactionUser: '', 'realtor.id': userId}}); // Затираем transactionUser
  //todo проверить получилось ли сделать update

  /*Удаляем транзакцию блокировку */
  if (oldStatus != 'connection' || realty.realtor.id != userId) {
    delRedisKey(realtyId);
    delRedisKey(userId);
    console.log('Transaction buy completed');
  } else {
    console.log('Moved to taken successfully');
  }

  function buyOceanBackwardsCommits(stage) {
    if (stage > 0) {
      Realty.update({_id: realtyId}, {$set: {status: oldStatus, transactionUser: ''}});
    }
    if (stage > 1) {
      Balance.update({userId: userId}, {$inc: {current: price}});
    }
    delRedisKey(realtyId);
    delRedisKey(userId);
  }
  return {
    name: realty.contacts[0].name,
    phone: realty.contacts[0].phones[0].phone,
    address: {street: realty.address.street, house: realty.address.house},
    parseDetails: realty.parseDetails
  };
  //todo return телефон собственника

}

export function showRealtyDetails(realtyId, userId) {
  if (Meteor.isServer && Meteor.userId()) {

    let realty = Realty.findOne({_id: realtyId});
    if (!realty) {
      //Не даём взять объект
      return 'нет такого объекта';
    }

    if (realty.realtor.id != userId) {
      return 'Это не ваш объект';
    }

    return {
      name: realty.contacts[0].name,
      phone: realty.contacts[0].phones[0].phone,
      address: {street: realty.address.street, house: realty.address.house},
      parseDetails: realty.parseDetails
    };

  }
}

export function updateRealty(id, status, add) {
  if (Meteor.isServer) {
    let realty = Realty.findOne({_id: id});
    if (!realty) {
      return 'нет такого объекта';
    }
    console.log(status)
    if (status) {

      let modificator = {status: status}
      if (add == 'clearRelations') {
        modificator.realtor = '';
        modificator.relations = '';
      }

      Realty.update({_id: id}, {
        $set: modificator
      }, (error, result) => {
        console.log(realty);
        return realty;
      });


    }
  } else {
    return 'Что-то пошло не так';
  }
}

export function removeRealty(id) {
  if (Meteor.isServer && Meteor.userId() && Roles.userIsInRole(this.userId, 'operator')) {
    Realty.remove({_id: id});
    console.log('removed: '+id)
  } else {
    return 'Что-то пошло не так';
  }
}

export function addRealty(realty, notRealtor) {

  if (Meteor.isServer && Meteor.userId()) {
    //TODO побыстрому исправил проблему Roles
    if (!notRealtor) {
      //Генерим уникальный ID
      realty._id = nextAutoincrement(Realty) + '';

      //Если риэлтор - то сразу присваиваем объекты в его Лист
      if (!realty.realtor) {
        realty.realtor = {};
      }
      realty.realtor.id = Meteor.userId();

      realty.status = 'realtor';
    }
    let district;
    if (realty.address.districtName) {
      district = Locations.findOne({type: 'district', name: realty.address.districtName.slice(0, -4)});
    }

    if (district) {
      realty.address.districtId = district._id;
      realty.address.districtName = district.name;
      let area = Locations.findOne({type: 'area', _id: {$in: district.parents}});
      realty.address.areaId = area._id;
      realty.address.areaName = area.name;
    } else {
      console.log('нет в базе такого района. надо добавить: ', realty.address.districtName);
    }

    realty.address.dadata = Dadata.insert(realty.address.meta);

    Realty.insert(realty, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Realty added : id=${realty._id}`);
      }
    });

    return realty._id;
  }

}

function pay(amount, userId) {
  console.log(userId);
}

