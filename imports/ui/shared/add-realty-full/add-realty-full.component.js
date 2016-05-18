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
  constructor($state) {
    this.state = $state;
    this.dictionary = dictionary;
    this.realty = {contacts: [{phones: []}], address :{
      metroTransport : 0
    }};
    this.activeTab = 0;
    //fake selects Аренда Москва Квартиры
    this.fake = true;
  }

  submit() {
    //4 - Аренда - Квартиры
    const vm = this;
    this.realty.type = 4;
    this.realty.address = {
      city: 'Москва',
      country: 'Россия',
      flat: vm.locations.flat,
      street: vm.locations.street.value,
      house: vm.locations.house.value,
      meta: vm.locations.full.data,
      districtName: vm.locations.full.data.city_district,
      value: vm.locations.full.unrestricted_value
    };

    Meteor.call('addRealty', this.realty, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Realty added : cleintSide, ${vm.realty}`);
        this.state.go('crm.realty.one.review', {realtyId: result});
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
