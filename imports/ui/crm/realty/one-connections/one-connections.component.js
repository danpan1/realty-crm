/**
 * Created by Danpan on 09.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as ClientCard} from '/imports/ui/shared/client-card/client-card.component';
import {Clients} from '/imports/api/clients';

import './one-connections.view.html';

class OneConnections {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
    
    let vm = this;
    vm.assort = $stateParams.assort;
    vm.selectedTab = '';
    switch($stateParams.assort){
        case 'manual':
            vm.selectedTab = 0;
            break;
        case 'auto':
            vm.selectedTab = 1;
            break;
        default:
            vm.selectedTab = 0;
    }
    
    this.subscribe('listClients');

    this.helpers({
      clients() {
        return Clients.find();
      }
    });
  }

}

const moduleName = 'oneConnections';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  ClientCard
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-connections/one-connections.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: OneConnections
  });
