'use strict';
import {Meteor} from 'meteor/meteor';
import {Users} from '/server/users.model.js';

Meteor.methods({
  saveComment
});

export function saveComment(data) {

  console.log('===== DATA:');
  console.log(data);
  console.log('===== TASKS:');
  console.log(data.fullInfo.tasks);

  if (Meteor.isServer && Meteor.userId()) {
    
    console.log('===== userId:');
    console.log(Meteor.userId());

    Meteor.users.update({
      _id: Meteor.userId(), 
      "profile.couching.lessons.num": data.lesson
    }, {
      $set: {
        "num.$.std": data.fullInfo
      } 
    });

  }
}