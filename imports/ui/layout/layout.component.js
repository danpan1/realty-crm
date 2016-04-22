/**
 * Created by Danpan on 22.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './layout.view.html';

class Layout {
  constructor() {
  }

}

const moduleName = 'layout';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/layout/layout.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: Layout
  });
