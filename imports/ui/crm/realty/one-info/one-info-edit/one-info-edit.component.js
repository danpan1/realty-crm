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
    this.conditionsSelected = [];
    for(var i in this.dictionary.composition.length){
        this.conditionsSelected.push(false);
    }
    for(var i in this.realty.details.composition){
        this.conditionsSelected[this.realty.details.composition[i]] = true;
    }
  }
  
  ngOnInit() {
      if(!this.realty.details.composition) this.realty.details.composition = new Array(this.dictionary.composition.length);
  }
  
  onChangeRealty (realtyId) {
      this.realty.details.composition = [];
      for(var i in this.conditionsSelected){
          if(this.conditionsSelected[i] == true){
              this.realty.details.composition.push(i);
          }
      }
      
      
      
      Realty.update({_id: realtyId}, {
        $set: this.realty
      }, (error) => {
        if(error) {
          console.log(error)
        } else {
            console.log('call recieved newObj');
        }
      });
      
      
      this.show = false;
  }  
  addRoomSquare () {
    console.log(this.realty.details.roomsSquare.length)
    this.realty.details.roomsSquare.push(0);
  }
  
}

const moduleName = 'oneInfoEdit';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/one-info/one-info-edit/one-info-edit.view.html',
  bindings: {
      realty: '=',
      show: '='
  },
  controllerAs: moduleName,
  controller: OneInfoEdit
});

/*
                div(layout="row")
                    p Удобства:
                    p
                        realty-conditions(ng-model='oneInfoEdit.realty.details.conditions' required='') */

