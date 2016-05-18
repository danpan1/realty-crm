/**
 * Created by Danpan on 10.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Clients} from '/imports/api/clients';
import {ClientFilterQuery} from '/imports/api/client-filter-query';
import {dictionary} from '/imports/api/dictionary';

import './add-client-full.view.html';

class AddClientFull {
  /* @ngInject */
  constructor($scope, $reactive, $state) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.resetClient();
    this.activeTab = 0;
    this.state = $state;
    this.fake = true;
    this.client.comissionLoyal = true;
    this.client.need = {
        metroTransport: 0
    }
  }
  
  filterPhone(){
      if(this.client.phone.length >= 18) return false;
      this.client.phone = ' ' + this.client.phone;
  }
  
  submit(valid) {
    var value = this.client.phone.split('');
    for(var i in [1,2,3]){
        for(var i in value){
            if(value[i].match(/\+|\(|\)|\-|\s|d/)){
                value.splice(i,1);
            }
        }
    }
    this.client.phone = value.join('');
    
   
    var price = this.client.need.price.split('');
    for(var i in [1,2,3]){
        for(var i in price){
            if(price[i].match(/\s/)){
                price.splice(i,1);
            }
        }
    }
    this.client.need.price = price.join('');
    console.log(this.client.need.price);
    console.log(this.client.phone);
    
    console.log('submit');
    if (!valid) {
      alert('не все данные корректны');
      return;
    }
    // console.log(this.client);
    // for (var key in this.filterQuery) {
    //   if (key === 'districts' || key === 'subways') {
    //     continue;
    //   }
    //   this.client[key] = this.filterQuery[key];
    // }
    console.log('inserted', this.client);
    // Clients.insert(this.client);
    Meteor.call('addClient', this.client, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        this.state.go('crm.clients.list.my', {status: 'realtor'}) ;
      }
    });
    this.resetClient();
  }
  
  showThis(t){
      console.log(t);
  }

  resetClient() {
    const vm = this;
    this.client = {
      name: '',
      phone: '',
      status: vm.pageStatus,
      comissionLoyal: false,
      searchStartDate: new Date(),
      realtorNote: '',
      subways: [],
      districts: [],
      embedded: {
        subways: [],
        districts: []
      }
    };
    this.filterQuery = {roomcount: []};
    this.roomcount = [];
  }
}

const moduleName = 'addClientFull';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/add-client-full/add-client-full.view.html',
  bindings: {pageStatus: '@'},
  controllerAs: moduleName,
  controller: AddClientFull
});

