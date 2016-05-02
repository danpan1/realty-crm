/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './one-demonstrations.view.html';

class OneDemonstrations {
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'oneDemonstrations';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-demonstrations/one-demonstrations.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: OneDemonstrations
  });
