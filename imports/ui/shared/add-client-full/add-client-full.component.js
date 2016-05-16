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
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.resetClient();
    this.activeTab = 0;
  }

  submit(valid) {
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
    Meteor.call('addClient', this.client);
    this.resetClient();
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

