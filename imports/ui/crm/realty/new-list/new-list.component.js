import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './new-list.view.html';

class NewList {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'newList';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/new-list/new-list.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: NewList
  });

