'use strict';
import {Meteor} from 'meteor/meteor';
import {Users} from '/server/users.model.js';
import {Roles} from 'meteor/alanning:roles';

Meteor.methods({
  changePhotoSubways,
  checkPhoto
});

export function changePhotoSubways(id, subways) {
  if (Meteor.isServer && Meteor.userId()) {
    let user = Meteor.users.findOne({_id: id});
    console.log('user: ' + user);
    Meteor.users.update({_id: id}, {
      $set: {
        'profile.subways': subways
      }
    });
  }
};

export function checkPhoto(email) {
  console.log('==== checkPhoto start');
  if (Meteor.isServer && Meteor.userId()) {
    
    let user = Meteor.users.findOne({'emails.address': email});
    

    if (user.profile.photo) {
      console.log('User is a photographer');
      return true;
    } else {
      console.log('User is NOT a photographer');
      return false;
    }
    
  }
};
