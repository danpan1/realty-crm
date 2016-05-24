/**
 * Created by Danpan on 13.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '/imports/helpers/dictionary';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty/realty.model';
import {name as PhoneMask} from '/imports/ui/shared/phone-mask/phone-mask.component';

import './add-realty-full.view.html';

class AddRealtyFull {
  /* @ngInject */
  constructor($state) {
    this.state = $state;
    this.dictionary = dictionary;
    this.realty = {
        contacts: [
            {phones: [{phone:''}]}
        ], 
        address: {
        },
        details: {
            roomsSquare: []
        }
    };
    this.metroTransport = 0;
    this.activeTab = 0;
    //fake selects Аренда Москва Квартиры
    this.fake = true;
  }
  
  changeRoomCount () {
    if (this.realty.details.roomsSquare.length < this.realty.roomcount) {
      while (this.realty.details.roomsSquare.length < this.realty.roomcount) {
          this.realty.details.roomsSquare.push({square:0});
      }
    } else {
      while (this.realty.details.roomsSquare.length > this.realty.roomcount) {
        this.realty.details.roomsSquare.splice(this.realty.details.roomsSquare.length - 1,1);
      }
    }
  }

  submit() {

    var price = this.realty.price.split('');
    for(var i in [1,2,3]){
        for(var i in price){
            if(price[i].match(/\s/)){
                price.splice(i,1);
            }
        }
    }
    this.realty.price = price.join('');
    console.log(this.realty.price);
    console.log(this.realty.contacts[0].phones[0].phone);

    //4 - Аренда - Квартиры
    const vm = this;
    this.realty.type = 4;
    this.realty.address = {
      areaId:'',
      areaName: '',
      city: 'Москва',
      country: 'Россия',
      districtId : '',
      districtName: vm.locations.full.data.city_district,
      flat: vm.locations.flat,
      house: vm.locations.house.value,
      loc: [+vm.locations.full.data.geo_lon, +vm.locations.full.data.geo_lat],
      meta: vm.locations.full.data,
      metroTime : vm.locations.metroTime,
      metroTransport : vm.metroTransport,
      street: vm.locations.street.value,
      streetFiasId: vm.locations.street.data.fias_id,
      subways : vm.locations.subways,
      subwaysEmbedded : vm.locations.embedded.subways,
      value: vm.locations.full.unrestricted_value
    };
    console.log(this.realty.address.subwaysEmbedded);
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
  angularMeteor,
  PhoneMask
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/add-realty-full/add-realty-full.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: AddRealtyFull
});
