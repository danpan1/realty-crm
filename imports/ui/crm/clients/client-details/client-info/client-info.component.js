/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './client-info.view.html';

class ClientInfo {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
  }
}

const moduleName = 'clientInfo';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-info/client-info.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientInfo
});

