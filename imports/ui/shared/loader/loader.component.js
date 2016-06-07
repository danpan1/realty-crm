import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './loader.view.html';

class Loader {
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    $reactive(this).attach($scope);
  }
}

const moduleName = 'loader';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/loader/loader.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Loader
});

