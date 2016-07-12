'use strict';
import {Meteor} from 'meteor/meteor';
import {Filters} from '../filters.model.js';

Meteor.methods({
  addFilter,
  removeFilter,
  changeFilter
});

export function addFilter(filter) {

  console.log('========= addFilter');
  console.log('filter.user.id: '+filter.user.id);
  console.log('this.userId: '+this.userId);

  if (Meteor.isServer && Meteor.userId()) {
    
    let newFilter = filter;

    // get userId
    if (!this.userId || this.userId != filter.user.id) return 'Пользователь не найден';

    console.log(newFilter);

    Filters.insert(newFilter, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Filter added`);
      }
    });
    
  } else {
    console.log('no Access');
  }

}
export function changeFilter(data) {

  console.log('========= changeFilter');

  if (Meteor.isServer && Meteor.userId()) {

    // Проверки
    if (!this.userId) return 'Пользователь не найден';
    let filter = Filters.findOne({_id: data.id});
    if (filter.user.id != this.userId) return 'Это не ваш фильтр';

    let newParams = {
      filter: data.filter,
      name: data.name
    };
    
    console.log(filter);
    
    Filters.update({_id: data.id}, {
      $set: newParams
    });

  } else {
    console.log('no Access');
  }
}

export function removeFilter(id) {

  console.log('========= removeFilter');

  if (Meteor.isServer && Meteor.userId()) {

    Filters.remove({"_id":id}, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Filter removed`);
      }
    });

  } else console.log('no Access');
}