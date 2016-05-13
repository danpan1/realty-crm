/**
 * Created by Danpan on 13.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './add-realty-full.view.html';

class AddRealtyFull {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'addRealtyFull';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/add-realty-full/add-realty-full.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: AddRealtyFull
});
