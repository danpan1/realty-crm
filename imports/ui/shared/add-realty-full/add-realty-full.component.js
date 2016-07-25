/**
 * Created by Danpan on 13.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '/imports/helpers/dictionary';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty/realty.model';
import {name as PhoneMask} from '/imports/ui/shared/phone-mask/phone-mask.component';
import {name as subwayChoice} from '/imports/ui/shared/subway-choice/subway-choice.component';

import './add-realty-full.view.html';

class AddRealtyFull {
  /* @ngInject */
  constructor($state, $timeout) {
    this.state = $state; 
    this.$timeout = $timeout;
    this.dictionary = dictionary;
    this.realty = {
      contacts: [
        {phones: [{phone: ''}]}
      ],
      type: 4,
      address: {},
      details: {
        roomsSquare: [],
        depositTime : 1
      }
    };
    this.realty.comission = 100;
    this.realty.comissionLoyal = true;
    this.metroTransport = 0;
    this.activeTab = 0;
    //fake selects Аренда Москва Квартиры
    this.fake = true;
    this.submitted = false;
    
    this.$timeout(()=>{
      let inputs = document.getElementsByTagName("input");
      for(var i in inputs){
        if(inputs[i].addEventListener) inputs[i].addEventListener("mousewheel", function(event){ this.blur() })
      }
    },1000)

  }

  changeRoomCount() {
    if (this.realty.details.roomsSquare.length < this.realty.roomcount) {
      while (this.realty.details.roomsSquare.length < this.realty.roomcount) {
        this.realty.details.roomsSquare.push({square: 0});
      }
    } else {
      while (this.realty.details.roomsSquare.length > this.realty.roomcount) {
        this.realty.details.roomsSquare.splice(this.realty.details.roomsSquare.length - 1, 1);
      }
    }
  }

  submit() {
    this.submitted = true;
        
    var price = this.realty.price.split('');
    for (var i in [1, 2, 3]) {
      for (var i in price) {
        if (price[i].match(/\s/)) {
          price.splice(i, 1);
        }
      }
    }
    this.realty.price = price.join('');
    console.log(this.realty.price);
    console.log(this.realty.contacts[0].phones[0].phone);

    if (!this.realty.comissionLoyal) this.realty.comission = '';

    //4 - Аренда - Квартиры
    const vm = this;

    if (!this.realty.realtor) {
      this.realty.realtor = {};
    }
    this.realty.realtor.phone = Meteor.user().profile.phone;
    this.realty.realtor.name = Meteor.user().profile.name;
    this.realty.realtor.realtorIdShort = Meteor.user().profile.realtorId;
    this.realty.type = 4;
    console.log(vm.locations.subway);
    this.realty.address = {
      areaId: '',
      areaName: '',
      city: 'Москва',
      country: 'Россия',
      districtId: '',
      districtName: vm.locations.full.data.city_district,
      flat: vm.locations.flat,
      house: vm.locations.house.value,
      lat: vm.locations.full.data.geo_lat,
      lon: vm.locations.full.data.geo_lon,
      loc: [+vm.locations.full.data.geo_lon, +vm.locations.full.data.geo_lat],
      meta: vm.locations.full.data,
      metroTime: vm.locations.metroTime,
      metroTransport: vm.metroTransport,
      street: vm.locations.street.value,
      streetFiasId: vm.locations.street.data.fias_id,
      subway: vm.locations.subway,
      //subways: vm.locations.subways,
      //subwaysEmbedded : vm.locations.embedded.subways,
      value: vm.locations.full.unrestricted_value
    };
    /*if (vm.locations.embedded) {
      this.realty.address.subwaysEmbedded = vm.locations.embedded.subways;
    }*/
    console.log(this.realty.address);
    
    this.realty.square = parseInt(this.realty.square);
    this.realty.details.livingSquare = parseInt(this.realty.details.livingSquare);
    this.realty.details.kitchenSquare = parseInt(this.realty.details.kitchenSquare);
    
    console.log(this.realty.address.subwaysEmbedded);
    Meteor.call('addRealty', this.realty, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Realty added : cleintSide, ${vm.realty}`);
        this.state.go('crm.realty.one.info', {realtyId: result});
      }
    });

  }

}

const moduleName = 'addRealtyFull';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  PhoneMask,
  subwayChoice
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/add-realty-full/add-realty-full.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: AddRealtyFull
});
