/**
 * Created by Danpan on 05.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Clients} from '/imports/api/clients';
import {ClientFilterQuery} from '/imports/api/client-filter-query';
import './add-client.view.html';

class AddClient {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    const vm = this;

    vm.name = '';
    vm.phone = '';
    vm.comissionLoyal = false;
    vm.searchStartDate = new Date();
    vm.realtorNote = '';
  }

  submit(valid) {
    if (!valid) {
      alert('не все данные корректны');
      return;
    }
    var clientFilterQueryId = ClientFilterQuery.insert(this.filterQuery);
    // console.log(t);
    // console.log(this.filterQuery);
    const vm = this;
    let user = {
      name: vm.name,
      phone: vm.phone,
      filterQueryIds: [clientFilterQueryId],
      comissionLoyal: vm.comissionLoyal,
      searchStartDate: vm.searchStartDate,
      realtorNote: vm.realtorNote,
      realtorId: Meteor.userId()
    };
    vm.name = '';
    vm.phone = '';
    vm.comissionLoyal = false;
    vm.searchStartDate = new Date();
    vm.realtorNote = '';
    console.log('inserted',user);
    Clients.insert(user);
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
