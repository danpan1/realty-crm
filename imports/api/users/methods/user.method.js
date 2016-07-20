'use strict';
import {Meteor} from 'meteor/meteor';
import {Users} from '/server/users.model.js';
import {Roles} from 'meteor/alanning:roles';

Meteor.methods({
  setCity,
  setLessons
});

export function setCity(id, city) {
  if (Meteor.isServer && Meteor.userId()) {
    let user = Meteor.users.findOne({_id: id});
    console.log('user: ' + user);
    Meteor.users.update({_id: id}, {
      $set: {
        'profile.city': city
      }
    });
  }
};

export function setLessons(lessons) {
  if (Meteor.isServer && Meteor.userId()) {
    let user = Meteor.users.findOne({_id: Meteor.userId()});
    console.log('user: ' + user);
    Meteor.users.update({_id: Meteor.userId()}, {
      $set: {
        'profile.couching.lessons': lessons
      }
    });
  }
};