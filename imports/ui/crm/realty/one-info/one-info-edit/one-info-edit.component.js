/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../../../helpers/dictionary';
import {Realty} from '/imports/api/realty';

import './one-info-edit.view.html';

class OneInfoEdit {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.compositionSelected = [];
    for(var i in this.dictionary.composition.length){
        this.compositionSelected.push(false);
    }
    for(var i in this.realty.details.composition){
        this.compositionSelected[this.realty.details.composition[i]] = true;
    }
  }
  
  ngOnInit(price) {
    if(!this.realty.details.composition) this.realty.details.composition = new Array(this.dictionary.composition.length);
      
    if (price) {
        var number = price.toString();
        number = number.split('').reverse().join('');
        number = number.length > 3 ? number.length > 6 ? number.length > 6 ? number.slice(0, 3) + ' ' + number.slice(3,6) +  ' ' + number.slice(6,9) + ' ' + number.slice(9) : number.slice(0, 3) + ' ' + number.slice(3,6) + ' ' + number.slice(6) :  number.slice(0, 3) + ' ' + number.slice(3) : number;
        number = number.split('').reverse().join('');
        this.realty.price = number;
    }
  }
  
  onChangeRealty (realtyId) {
      this.realty.details.composition = [];
      for(var i in this.compositionSelected){
          if(this.compositionSelected[i] == true){
              this.realty.details.composition.push(i);
          }
      }
      
      var price = this.realty.price.split('');
      for(var i in [1,2,3]){
          for(var i in price){
              if(price[i].match(/\s/)){
                  price.splice(i,1);
              }
          }
      }
      price = price.join('');
      this.realty.price = parseInt(price);
      
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

