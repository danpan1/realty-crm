/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../../../helpers/dictionary';
import {Realty} from '/imports/api/realty';
import {name as Loader} from '/imports/ui/shared/loader/loader.component';

import './one-info-edit.view.html';

class OneInfoEdit {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.compositionSelected = [];
    if(!this.realty.details.composition){
      this.realty.details.composition = [0];
    }
    for(var i in this.dictionary.composition.length){
        this.compositionSelected.push(false);
    }
    for(var i in this.realty.details.composition){
        this.compositionSelected[this.realty.details.composition[i]] = true;
    }
  }
  /*
  addRoomSquare () {
    console.log(this.realty.details.roomsSquare.length)
    this.realty.details.roomsSquare.push(0);
  }
  */
  ngOnInit(price) {
    if(!this.realty.details.composition) this.realty.details.composition = new Array(this.dictionary.composition.length);
  }
  
  onChangeRealty (realtyId) {
    if (typeof this.realty.details.roomsSquare != 'string') this.realty.details.roomsSquare = '';
    this.realty.address.street = this.realty.address.street.value || this.realty.address.street; 
    this.realty.address.house = this.realty.address.house.value || this.realty.address.house;
    this.showLoader = true;
    
    Realty.update({_id: realtyId}, {
      $set: this.realty
    }, (error) => {
      if(error) {
        console.log(error)
        this.showLoader, this.show = false;
      } else {
        console.log('call recieved newObj');
        this.showLoader, this.show = false;
      }
    });
  }  
  
}

const moduleName = 'oneInfoEdit';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  Loader
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

