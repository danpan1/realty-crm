'use strict';
import {Meteor} from 'meteor/meteor';
import {Couching} from '../couching.model.js';

Meteor.methods({
  saveComment,
  checkLessonAccess,
  insertLessons
});

export function insertLessons (id) {

  if (Meteor.isServer && Meteor.userId()) {

    let checkUser = Couching.findOne({
      userId: id,
      number: 1
    });

    console.log(checkUser);
    if (!checkUser) {

      for(var i = 1; i < 7; i++) {
        Couching.insert({
          userId: id, 
          number: i,
          done: false,
          available: i == 1 ? true : false,
          tasks: [{
            id: 1,
            done: false,
            comment: ''
          }, {
            id: 2,
            done: false,
            comment: ''
          }]
        });
      }
    }
  }
}

export function saveComment(data) {

  console.log('===== DATA:');
  console.log(data);
  console.log('===== TASKS:');
  console.log(data.tasks);

  if (Meteor.isServer && Meteor.userId()) {
    
    Couching.update({
      userId: Meteor.userId(), 
      number: data.number
    }, {
      $set: {
        done: data.done,
        available: data.available,
        tasks: data.tasks
      } 
    });

    return Couching.findOne({userId: Meteor.userId(), number: data.number})
  }
}

export function checkLessonAccess(num) {

  if (Meteor.isServer && Meteor.userId()) {
    
    console.log(num);
    console.log(Meteor.userId());

    let lesson = Couching.findOne({
      userId: Meteor.userId(), 
      number: parseInt(num)
    });

    console.log(lesson);
    if (lesson){
      return lesson;
    } else {
      return false;
    }

  }
}