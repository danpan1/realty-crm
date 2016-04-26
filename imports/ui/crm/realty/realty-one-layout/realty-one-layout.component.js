/**
 * Created by Danpan on 26.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './realty-one-layout.view.html';

class RealtyOneLayout {
  /* @ngInject */
  // constructor($scope, $reactive) {
  //   $reactive(this).attach($scope);
  // }

}

const moduleName = 'realtyOneLayout';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/realty-one-layout/realty-one-layout.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: RealtyOneLayout
  });
