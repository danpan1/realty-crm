/**
 * Created by Danpan on 29.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './in-work-list.view.html';

class InWorkList {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'inWorkList';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/in-work-list/in-work-list.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: InWorkList
  });
