/**
 * Created by Danpan on 09.04.16.
 */
'use strict';
import {Meteor} from 'meteor/meteor';
import {Realty} from './realty.model';
import {_} from 'meteor/underscore';
import {Roles} from 'meteor/alanning:roles';

Meteor.methods({
  submitReviewDate,
  takeRealty
});

export function submitReviewDate(date, id) {

  if (Meteor.isServer && this.userId && Roles.userIsInRole(this.userId, ['business'])) {

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

  if (Meteor.isServer && this.userId && Roles.userIsInRole(this.userId, ['business'])) {

    Realty.update({_id: realtyId}, {
      $set: {
        'realtor.id': this.userId,
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
