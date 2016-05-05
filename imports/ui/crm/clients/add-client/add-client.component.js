/**
 * Created by Danpan on 05.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './add-client.view.html';

class AddClient {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
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
