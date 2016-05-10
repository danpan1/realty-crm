/**
 * Created by Danpan on 10.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './add-client-full.view.html';

class AddClientFull {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'addClientFull';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/shared/add-client-full/add-client-full.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: AddClientFull
  });

