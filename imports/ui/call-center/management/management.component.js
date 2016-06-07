/**
 * Created by Danpan on 07.06.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './management.view.html';

class Management {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'management';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/call-center/management/management.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Management
});

