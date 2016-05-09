/**
 * Created by Danpan on 09.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './one-connections.view.html';

class OneConnections {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'oneConnections';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-connections/one-connections.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: OneConnections
  });
