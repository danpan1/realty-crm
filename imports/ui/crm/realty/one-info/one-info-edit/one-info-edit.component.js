/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../../../api/dictionary';
import {Realty} from '/imports/api/realty';

import './one-info-edit.view.html';

class OneInfoEdit {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
  }
  
  onChangeRealty (realtyId, conditions) {
      this.currentConditions = [];
      for(var i in dictionary.conditions){
          this.currentConditions[i] = {};
      }
      console.log(dictionary.conditions);
      console.log(conditions);
      for(var i in conditions){
        for(var n in dictionary.conditions){
            if(conditions[i] == dictionary.conditions[n].id){
                this.currentconditions[n].presence = true;
                console.log(this.currentconditions[n]);
            }
        }
      }
      
      
      Realty.update({_id: realtyId}, {
        $set: this.realty
      }, (error) => {
        if(error) {
          console.log(error)
        } else {
            /*if(callback){
                if(typeof callback == 'function'){
                    console.log(callback)
                    callback();
                }
            }*/
            console.log('call recieved newObj');
        }
      });
      
      
      this.show = false;
  }  
  addRoomSquare () {
    console.log(this.realty.details.roomsSquare.length)
    this.realty.details.roomsSquare.push(0);
  }
  /*
  updateRealty(realtyId) {
      Realty.update({_id: realtyId}, {
        $set: vm.realty
      }, (error) => {
        if(error) {
          console.log(error)
        } else {
          if(callback && typeof callback == 'function')
            callback();
        }
      });
  }*/
}

const moduleName = 'oneInfoEdit';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/one-info/one-info-edit/one-info-edit.view.html',
  bindings: {
      realty: '=',
      show: '=',
      currentconditions: '='
  },
  controllerAs: moduleName,
  controller: OneInfoEdit
});

