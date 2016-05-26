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
  submitReviewDate,
  addRealty,
  takeRealty
});

export function submitReviewDate(date, id) {

  if (Meteor.isServer && Meteor.userId()) {

    Realty.update({_id: id}, {
      $set: {
        'realtor.reviewDate': date,
        status: 'review'
      }
    }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Submited  Review Date');
      }
    });

  }

}

export function takeRealty(realtyId) {

  if (Meteor.isServer && Meteor.userId()) {

    Realty.update({_id: realtyId}, {
      $set: {
        'realtor.id': Meteor.userId(),
        'realtor.takeDate': new Date(),
        'status': 'taken'
      }
    }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Take Date set');
      }
    });

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
      // realty.realtor.id = Meteor.userId();
      realty.realtor = {$ref: 'users', $id: Meteor.userId()};
      realty.status = 'taken';
    }

    let district = Locations.findOne({type: 'district', name: realty.address.districtName.slice(0, -4)});

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
