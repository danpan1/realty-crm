/**
 * Created by Danpan on 09.04.16.
 */
'use strict';
import {Meteor} from 'meteor/meteor';
import {Realty} from '../realty.model.js';
import {Dadata} from '/imports/api/dadata';
import {Locations} from '/imports/api/locations';
import {_} from 'meteor/underscore';
import {Roles} from 'meteor/alanning:roles';
import nextAutoincrement from '../../../helpers/getUniqueId';

Meteor.methods({
  addRealty,
  addRealtyToMyList,
  takeRealty,
  showRealtyPhone,
  showRealtyDetails
});

/**
 * takeRealty - взять объект недвижимости. Кнопка взять на странице Новые объекты.
 * @param realtyId
 */

export function showRealtyDetails (realtyId, userId) {
  if (Meteor.isServer && Meteor.userId()) {
    
    let realty = Realty.findOne({_id: realtyId});
    if (!realty) {
      //Не даём взять объект
      return 'нет такого объекта';
    }
    
    console.log(realty.realtor.id + ' == ' + userId);
    if (realty.realtor.id != userId){
       return 'Это не ваш объект';
    }
    
    return {name: realty.contacts[0].name, phone: realty.contacts[0].phones[0].phone, address: {street:realty.address.street, house:realty.address.house}};
    
  }
}

export function addRealtyToMyList(realtyId) {

  if (Meteor.isServer && Meteor.userId()) {

    let realty = Realty.findOne({_id: realtyId});
    if (!realty) {
      //Не даём взять объект
      return 'нет такого объекта';
    }

    if (realty.status !== 'taken') {
      //Не даём взять объект
      return 'метод вызывается в неправильном месте. попытка взлома';
    }

    if (realty.realtor && realty.realtor.id !== this.userId) {
      //Не даём взять объект
      return 'не владелец объекта';
    }

    Realty.update({_id: realtyId}, {
      $set: {
        'status': 'realtor'
      }
    }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('status realtor set');
      }
    });
    //TODO переставить внутри Realty update
    return 'по идее ок';

  }
}

export function takeRealty(realtyId, status) {
  if (Meteor.isServer && Meteor.userId()) {
    if (Roles.userIsInRole(Meteor.userId(), 'paid') || Roles.userIsInRole(Meteor.userId(), 'paidSale')) {

      console.log('takeRealty')
      let realty = Realty.findOne({_id: realtyId});
      if (!realty) {
        //Не даём взять объект
        return 'нет такого объекта';
      }

      // НЖНО ПОПРАВИТЬ ЭТИ ЛАЙЗЕЙКИ В ПРОВЕРКАХ БЕЗОПАСНОСТИ

      if (realty.status !== 'new' && realty.status !== 'cian' && (realty.status === 'taken' && status === 'taken')) {
        //Не даём взять объект
        return 'метод вызывается в неправильном месте. попытка взлома';
      }

      if (realty.realtor && realty.realtor.id && (realty.status === 'taken' && status === 'taken')) {
        //Не даём взять объект
        return 'у объекта уже есть владелец. попытка взлома';
      }


      if (status) {

        let user = Meteor.users.findOne({_id: this.userId});
        Meteor.users.update({_id: this.userId},
          {$inc: {takenRealty: 1}}
        );
        console.log(user.takenRealty, ` = takenRealty user ${user.profile.name}`);

        //Если меньше 100 объектов уже взято, тогда даём взять объект
        if (status != 'agency') {
          if (user.takenRealty <= 400 || !user.takenRealty) {
            var nextCount = nextAutoincrement(Realty) + '';
            Realty.update({_id: realtyId}, {
              $set: {
                'realtor.id': Meteor.userId(),
                'status': status
              }
            }, (error) => {
              if (error) {
                console.log(error);
                return;
              } else {
                console.log('Take Date set');
                return;
              }
            });
          } else {
            //Не даём взять объект
            return 'больше 100 объектов взято в этом месяце';
          }
        } else if (status == 'agency') {
          Realty.update({_id: realtyId}, {
            $set: {
              'realtor.id': Meteor.userId(),
              'status': 'agency'
            }
          });
        }

      } else {
        
        Realty.update({_id: realtyId}, {
          $set: {
            'realtor.id': Meteor.userId(),
            'status': 'taken'
          }
        });
                  
      }

      // Если действие не определено, отдаем телефоны и имя
      return {name: realty.contacts[0].name, phone: realty.contacts[0].phones[0].phone, address: {street:realty.address.street, house:realty.address.house}};

    } else {
      console.log('NOt paid');
      return 'NOt paid';
    }
  }
}

export function showRealtyPhone (realtyId) {
  if (Meteor.isServer && Meteor.userId()) {
    if (Roles.userIsInRole(Meteor.userId(), 'paid') || Roles.userIsInRole(Meteor.userId(), 'paidSale')) {

      let realty = Realty.findOne({_id: realtyId});
      
      if (!realty) {
        return 'нет такого объекта';
      }

      if (realty.status !== 'new') {
        return 'метод вызывается в неправильном месте. попытка взлома';
      }

      /*if (realty.realtor && realty.realtor.id && (realty.status === 'taken' && status === 'taken')) {
        return 'у объекта уже есть владелец. попытка взлома';
      }*/

      return realty.contacts[0].phones[0].phone;

    } else {
      
      return 'Not paid';
      
    }
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
