/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Clients} from '/imports/api/clients';

import './client-details.view.html';

class ClientDetails {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);

    let vm = this;
    vm._id = $stateParams.client ? $stateParams.client : 'XXX';
    vm.selectedTab = '';

    this.subscribe('listClients', () => {
      if (vm._id) {
        return [{_id: vm.getReactively('_id')}];
      } else {
        return [];
      }
    });
    this.helpers({
      clients() {
        return Clients.find({_id: vm._id});
      }
    });

    switch ($stateParams.activetab) {
      case 'suit':
        vm.selectedTab = 0;
        break;
      case 'connections':
        vm.selectedTab = 1;
        break;
      case 'analytics':
        vm.selectedTab = 2;
        break;
      /*case 'demonstration':
        vm.selectedTab = 1;
        break;
      case 'email':
        vm.selectedTab = 2;
        break;*/
      case 'info':
        vm.selectedTab = 3;
        break;
      default:
        vm.selectedTab = 3;
    }

  }
}

const moduleName = 'clientDetails';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-details.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientDetails
});

