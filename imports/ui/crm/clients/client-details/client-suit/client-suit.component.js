/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Clients} from '/imports/api/clients';
import {name as clientSuitExact} from './client-suit-exact/client-suit-exact.component'

import './client-suit.view.html';

class ClientSuit {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
    var vm = this;
    vm.suitby = $stateParams.suitby ? $stateParams.suitby : 'exact';
    vm.selectedTab = '';
    switch ($stateParams.suitby) {
      case 'my':
        vm.selectedTab = 0;
        break;
      case 'exact':
        vm.selectedTab = 1;
        break;
      case 'auto':
        vm.selectedTab = 2;
        break;
      default:
        vm.selectedTab = 1;
    }
  }
}

const moduleName = 'clientSuit';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  clientSuitExact
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-suit/client-suit.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientSuit
});

