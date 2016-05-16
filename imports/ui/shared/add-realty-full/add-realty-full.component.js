/**
 * Created by Danpan on 13.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '/imports/api/dictionary';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty/realty.model';

import './add-realty-full.view.html';

class AddRealtyFull {
  /* @ngInject */
  constructor($scope, $reactive, $state) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.realty = {contacts : [{phones:[]}]};
    this.activeTab = 0;
    this.state = $state;
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
    console.log('this.realty', this.realty);
    console.log('this.locations', this.locations);
    Meteor.call('addRealty', this.realty, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Realty added : cleintSide, ${vm.realty}`);
        console.log(result);
        this.state.go('crm.realty.one.info', {realtyId: result}) ;
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
