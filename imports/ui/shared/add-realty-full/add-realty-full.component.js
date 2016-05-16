/**
 * Created by Danpan on 13.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '/imports/api/dictionary';
import {Meteor} from 'meteor/meteor';

import './add-realty-full.view.html';

class AddRealtyFull {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.realty = {};
    this.activeTab = 0;
  }
//ng-disabled='firstForm.$invalid || secondForm.$invalid || false'
  submit(valid) {
    const vm = this;
    if (!valid) {
      return;
    }
    /*var compositionArr = [false,false,false,false,false,false,false];
    for(var i in this.realty.details.composition){
        compositionArr[this.realty.details.composition[i]] = true;
    }
    this.realty.details.composition = compositionArr;*/
    this.realty.status = 'sale';
    this.realty.address = {
      city: 'Москва',
      country: 'Россия',
      street: vm.locations.street.value,
      house: vm.locations.house.value,
      meta: vm.locations.full.data,
      districtName: vm.locations.full.data.city_district,
      value: vm.locations.full.unrestricted_value
    };

    Meteor.call('addRealty', this.realty, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Realty added : cleintSide, ${vm.realty}`);
      }
    });
    
  }

}

const moduleName = 'addRealtyFull';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/add-realty-full/add-realty-full.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: AddRealtyFull
});
