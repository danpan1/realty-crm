/**
 * Created by Danpan on 11.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './conditions.view.html';

class Conditions {
  /* @ngInject */
  constructor($scope, $reactive, $timeout, $state) {
    $reactive(this).attach($scope);
    let vm = this;
  }
}

const moduleName = 'conditions';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/conditions/conditions.view.html',
  bindings: {
    conditions: '<'
  },
  controllerAs: moduleName,
  controller: Conditions
});
