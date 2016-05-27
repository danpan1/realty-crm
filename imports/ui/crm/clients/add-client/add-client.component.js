/**
 * Created by Danpan on 05.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Clients} from '/imports/api/clients';
import {dictionary} from '/imports/helpers/dictionary';
import './add-client.view.html';

class AddClient {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.resetClient();
  }

  submit(valid) {
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
    Clients.insert(this.client);
    this.resetClient();
  }

  resetClient() {
    this.client = {
      name: '',
      phone: '',
      status: 'realtor',
      comissionLoyal: false,
      searchStartDate: new Date(),
      note: '',
      subways: [],
      districts : [],
      subwaysEmbeded :[],
      districtsEmbeded: []
    };
    this.filterQuery = {roomcount: []};
    this.roomcount = [];
  }
}

const moduleName = 'addClient';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/add-client/add-client.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: AddClient
});
