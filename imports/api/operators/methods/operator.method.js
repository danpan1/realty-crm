'use strict';
import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {Operators} from '../operators.model';
//import nextAutoincrement from '/imports/helpers/getUniqueId';

Meteor.methods({
  operatorStat
});

export function operatorStat(choice) {

  if (Meteor.isServer && Meteor.userId() && Roles.userIsInRole(Meteor.userId(), 'operator')) {
    
    let newCallResult = {result:{}};

    // set operation Id
    //newCallResult.id = nextAutoincrement(Operators);
    console.log('newCallResult.operatorId: '+newCallResult.operatorId);

    // get userId
    if (this.userId) newCallResult.operatorId = this.userId; else return 'Пользователь не найден';

    // set Date
    newCallResult.createdAt = new Date();

    // set call result
    if (choice) newCallResult.result = choice; else return 'Результат звонка не определен';

    // set object exclusive and comission
    //newCallResult.result.exclusive = exclusive || false;
    //newCallResult.result.comission = comission || false;


    console.log(' === newCallResult ==== ');
    console.log(newCallResult);
    if (newCallResult.createdAt && newCallResult.result){ 
      Operators.insert(newCallResult, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Client added : id=${newCallResult.id}`);
        }
      });
    }

  } else {
    console.log('no Access');
  }
}

/*if(!operatorData) operatorData = {};
    console.log(operatorData);
    console.log(choice);
    operatorData.objectsWorked = operatorData.objectsWorked ? operatorData.objectsWorked += 1 : 1;
    if(choice == 'objectsSkipped') operatorData.objectsSkipped = operatorData.objectsSkipped ? operatorData.objectsSkipped += 1 : 1;
    else if(choice == 'objectsDelayed') operatorData.objectsDelayed = operatorData.objectsDelayed ? operatorData.objectsDelayed += 1 : 1;
    else if(choice == 'objectsNoActual') operatorData.objectsNoActual = operatorData.objectsNoActual ? operatorData.objectsNoActual += 1 : 1;
    else if(choice == 'objectsDeclained') operatorData.objectsDeclained = operatorData.objectsDeclained ? operatorData.objectsDeclained += 1 : 1;
    else if(choice == 'objectsAgency') operatorData.objectsAgency = operatorData.objectsAgency ? operatorData.objectsAgency += 1 : 1;
    else if(choice == 'objectsNotAvailable') operatorData.objectsNotAvailable = operatorData.objectsNotAvailable ? operatorData.objectsNotAvailable += 1 : 1;
    else if(choice == 'objectsSaved') {
        operatorData.objectsSaved = operatorData.objectsSaved ? operatorData.objectsSaved += 1 : 1;
        if(unique == true) operatorData.objectsUnique = operatorData.objectsUnique ? operatorData.objectsUnique += 1 : 1;
        if(comission == true) operatorData.objectsComission = operatorData.objectsComission ? operatorData.objectsComission += 1 : 1;
    }
    console.log(operatorData);
    Meteor.users.update({_id: this.userId}, {
      $set: {
        'profile.operator': operatorData
      }
    });*/