/**
 * Created by Danpan on 26.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './realty-list-layout.view.html';

class RealtyListLayout {
  /* @ngInject */
  // constructor($scope, $reactive) {
  //   $reactive(this).attach($scope);
  // }

}

const moduleName = 'realtyListLayout';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/realty-list-layout/realty-list-layout.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: RealtyListLayout
  });
