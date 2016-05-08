import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';
Meteor.methods({
  operatorGet,
  operatorSave,
  operatorSet
});
function operatorGet() {

  //TODO findAnModify
  if (Meteor.isServer) {
    let one, call;
    let currentTime = new Date();
    //сначала ищем в статусе отложенного звонка
    one = Realty.findOne({
      status: 'later', 'operator.laterCall': {'$lte': currentTime}
    }, {
      sort: {$natural: -1}
    });
    call = Realty.findOne({
      status: 'call', 'operator.id': {'$lte': currentTime}
    }, {
      sort: {$natural: -1}
    });
    // потом просто новые
    if (one) {
      console.log('find object status = later');
    } else if (call) {
      console.log('find object status = call');
      one = Realty.findOne({status: 'call'}); //TODO сделать update на realtor id
    } else {
      console.log('find object status = new');
      one = Realty.findOne({status: 'new'}, {sort: {$natural: -1}});
    }

    Realty.update({_id: one._id}, {
      $set: {status: 'call', operator}
    }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('call recieved newObj');
      }
    });
    return one;
  }
}

function operatorSave(operator, realty) {

  if (Meteor.isServer) {
    let operatorData = {
      id: this.userId,
      qualification: operator.qualification,
      comment: operator.comment
    };
    realty.status = 'list';
    realty.operator = operatorData;
    Realty.update({_id: realty._id}, {
      $set: realty
    }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('operator save success');
      }
    });

  }
}

/**
 * Устанавливаем резолюцию после звонка.
 * @param data
 * @param notAvailable Если не отвечает абонент, переносим звонок на час позже. Если 3 раза не отвечает удаляем
 */
function operatorSet(data, notAvailable) {

  if (Meteor.isServer) {

    let countLaterCalls = Realty.findOne({_id: data._id}).operator.laterCount;
    if (!countLaterCalls)
      countLaterCalls = 0;

    if (countLaterCalls == 2) data.status = 'analyze';

    let operatorData = {
      id: this.userId,
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
      date.setHours(date.getHours() + 1);
      // date.setMinutes(date.getMinutes() + 1);
      operatorData.laterCall = date;
      operatorData.laterCount = countLaterCalls + 1;
    }

    Realty.update({_id: data._id}, {
      $set: {status: data.status, operator: operatorData}
    }, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`operator ${data.status} success`);
      }
      return true;
    });

  }

}
