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
    this.realty = {contacts: [{phones: [{phone:''}]}], address :{
      metroTransport : 0
    }};
    this.activeTab = 0;
    //fake selects Аренда Москва Квартиры
    this.fake = true;
  }
       
  filterPhoneKeyPress(){
      if(this.realty.contacts[0].phones[0].phone.length >= 17) return false;
      if(this.realty.contacts[0].phones[0].phone[0] != '7') this.realty.contacts[0].phones[0].phone = '7 ' + this.realty.contacts[0].phones[0].phone;
  }
  filterPhoneFocus () {
      if(!this.realty.contacts[0].phones[0].phone || this.realty.contacts[0].phones[0].phone[0] != '7') this.realty.contacts[0].phones[0].phone = '7';
  }
  
  submit() {
    var phone = this.realty.contacts[0].phones[0].phone.split('');
    for(var i in [1,2,3]){
        for(var i in phone){
            if(phone[i].match(/\+|\(|\)|\-|\s|d/)){
                phone.splice(i,1);
            }
        }
    }
    this.realty.contacts[0].phones[0].phone = phone.join('');
    
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
    console.log(this.realty.contacts[0].phones[0].phone );
    
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
