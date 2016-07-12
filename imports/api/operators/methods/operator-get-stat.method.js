'use strict';
import {Meteor} from 'meteor/meteor';
import {Operators} from '../operators.model.js';
import {Users} from '/server/users.model.js';

Meteor.methods({
  operatorGetStat
});

export function operatorGetStat() {

  if (Meteor.isServer && Meteor.userId()) {
    let nullMatch = {};
    let opers = Operators.aggregate([{
      $group: {
        _id: {type: '$result', operatorId: '$operatorId'},
        totalType: {$sum: 1}
      }
    }, {
      $group: {
        _id: {operatorId: '$_id.operatorId'},
        totalCalls: {$sum: '$totalType'},
        stats: {$push: {type: '$_id.type', count: '$totalType'}}
      }
    }, {
      $sort: {'_id.operatorId': 1}
    }]).map((operator)=> {
      let newOperator = {};
      newOperator.totalCalls = operator.totalCalls;
      newOperator.percents = {};
      console.log(operator);
      var oper = Meteor.users.findOne({_id: operator._id.operatorId});
      if (oper) {
        newOperator.name = oper.profile.name + (oper.profile.surName ? ' ' + oper.profile.surName : '');
        newOperator.phone = oper.profile.phone;
        newOperator.email = oper.emails[0].address;
      }
      operator.stats.forEach((stat)=> {
        newOperator[stat.type] = stat.count;
        newOperator.ocean = (newOperator.objectsSaved || 0) + (newOperator.objectsSavedExc || 0) + (newOperator.objectsSavedCom || 0) + (newOperator.objectsSavedComAndExc || 0);
        newOperator.objectsSavedCom = (newOperator.objectsSavedCom || 0) + (newOperator.objectsSavedComAndExc || 0);
        newOperator.objectsSavedExc = (newOperator.objectsSavedExc || 0) + (newOperator.objectsSavedComAndExc || 0);
        newOperator.percents[stat.type] = parseInt(100 / newOperator.totalCalls * stat.count);
        newOperator.percents.ocean = parseInt(100 / newOperator.totalCalls * newOperator.ocean);
        newOperator.percents.objectsSavedCom = parseInt(100 / newOperator.ocean * newOperator.objectsSavedCom);
        newOperator.percents.objectsSavedExc = parseInt(100 / newOperator.ocean * newOperator.objectsSavedExc);
      });
      newOperator.id = operator._id.operatorId;
      return newOperator;
    });
    return opers;
  }

// for (let o in opers) {
//
//   var oper = Meteor.users.findOne({_id: opers[o].id});
//   console.log(oper);
//   if (oper) {
//     opers[o].name = oper.profile.name + ' ' + oper.profile.surName;
//     opers[o].phone = oper.profile.phone;
//     opers[o].email = oper.emails[0].address;
//   }
//
//   let curMatch = {operatorId: opers[o].id};
//   opers[o].results = Operators.aggregate([{$match: curMatch},
//     {
//       $group: {
//         _id: {type: '$result.type'},
//         totalType: {$sum: 1}
//       }
//     }, {
//       $sort: {'result.type': 1}
//     }]).map((u)=> {
//     if (u._id.type == 'objectsAgency') opers[o].objectsAgency = u.totalType;
//     if (u._id.type == 'objectsDelayed') opers[o].objectsDelayed = u.totalType;
//     if (u._id.type == 'objectsNotAvailable') opers[o].objectsNotAvailable = u.totalType;
//     if (u._id.type == 'objectsNoActual') opers[o].objectsNoActual = u.totalType;
//     if (u._id.type == 'objectsSkipped') opers[o].objectsSkipped = u.totalType;
//     if (u._id.type == 'objectsSaved') opers[o].objectsSaved = u.totalType;
//   })
// }


}

