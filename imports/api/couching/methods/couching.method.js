'use strict';
import {Meteor} from 'meteor/meteor';
import {Users} from '/server/users.model.js';

Meteor.methods({
  saveComment
});

export function saveComment(data) {

  console.log('===== DATA:');
  console.log(data);

  if (Meteor.isServer && Meteor.userId()) {

    Meteor.users.update({
      _id: 1, 
      "profile.couching.lessons.num": data.lesson
    }, {
      $set: {
        "num.$.std": data.fullInfo
      } 
    });

  }
}