import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';
import {ParserCounters} from '/imports/api/parsercounters/';

Meteor.methods({
  parsingStats,
  operatorGet,
  operatorSave,
  operatorSet,
  callList
});

function parsingStats() {
  if (Meteor.isServer) {

    let result = ParserCounters.aggregate([//{
      //$match: {
      //  date: {
      //    $gte: new Date("2016-06-16T00:00:00.000Z")
      //  }
      //}
      //},
      {
        $group: {
          _id: {
            reason: "$reason"
          },
          count: {
            $sum: 1
          }
        }
      }, {
        $sort: {
          '_id.reason': 1
        }
      }]);

    return result;

  }
}

function callList() {
  if (Meteor.isServer) {
    return Realty.find({status : {$in : ['new', 'later', 'call']}}).count();
  }

}

function operatorGet() {
  /*
  db.realty.findOne({
    status: 'later', 'operator.laterCall': {'$lte': new Date()}
  })
  */
  //TODO findAnModify
  if (Meteor.isServer && this.userId) {
    let one, call, currentTime = new Date();
    call = Realty.findOne({
      status: 'call', 'operator.id': this.userId
    }, {
      sort: {createdAt: -1}
    });
    // потом просто новые
    if (call) {
      console.log('find object status = call');
      one = call; //TODO сделать update на realtor id
    } else {
      console.log('find object status = later');
      //сначала ищем в статусе отложенного звонка
      one = Realty.findOne({
        status: 'later', 'operator.laterCall': {'$lte': currentTime}
      }, {
        sort: {createdAt: -1}
      });
      if (!one) {
        console.log('find object status = new');
        one = Realty.findOne({status: 'new'}, {sort: {createdAt: -1}});
      }
    }

    Realty.update({_id: one._id}, {
      $set: {status: 'call', 'operator.id': this.userId}
    }, (error) => {
      if (error) {
        console.log(error);
        setTimeout(function () {
          console.log(' === operatorGet ERROR === ')
        }, 100);
      } else {
        console.log('call recieved newObj');
      }
    });
    return one;
  }
}

function operatorSave(realty) {
  if (Meteor.isServer) {
    realty.operator.id = Meteor.userId();
    realty.status = 'ocean';
    Realty.update({_id: realty._id}, {
      $set: realty
    }, (error, result) => {
      if (error) {
        console.log(error);
        setTimeout(function () {
          console.log(' === operatorSave ERROR === ')
        }, 100);
      } else {
          console.log(' === operatorSave RESULT === ');
          console.log(result);
      }
    });
  }
}

/**
 * Устанавливаем резолюцию после звонка.
 * @param data
 * @param notAvailable Если не отвечает абонент, переносим звонок. Если 3 раза не отвечает удаляем
 */
function operatorSet(data, notAvailable) {

  if (Meteor.isServer) {

    let countLaterCalls = Realty.findOne({_id: data._id}).operator.laterCount;

    if (!countLaterCalls) countLaterCalls = 0;
    if (countLaterCalls == 3) data.status = 'analyze';

    let operatorData = {
      id: Meteor.userId(),
      qualification: data.operator.qualification,
      comment: data.operator.comment,
      callDate: new Date(),
      laterCall: data.laterCall
    };

    //когда собственник отвечает по телефону, но переносит звонок
    if (data.laterCall) operatorData.laterCount = countLaterCalls + 1;

    //когда собственник не отвечает по телефону
    if (notAvailable == 'notAvailable') {
      let date = new Date();
      if (countLaterCalls == 0) date.setHours(date.getHours() + 3);
      if (countLaterCalls == 1) date.setHours(date.getHours() + 24);
      if (countLaterCalls == 2) date.setHours(date.getHours() + 168);
      // date.setMinutes(date.getMinutes() + 1);
      operatorData.laterCall = date;
      operatorData.laterCount = countLaterCalls + 1;
    }

    Realty.update({_id: data._id}, {
      $set: {status: data.status, operator: operatorData}
    }, (error) => {
      if (error) {
        console.log(error);
        setTimeout(function () {
          console.log(' === operatorSet ERROR === ')
        }, 100);
      } else {
        console.log(`operator ${data.status} success`);
      }
      return true;
    });

  }

}
