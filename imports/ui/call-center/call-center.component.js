import angular from 'angular';
import angularMeteor from 'angular-meteor';
import routes from './call-center.routes';

import './call-center.view.html';

class CallCenter {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'callCenter';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/call-center/call-center.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: CallCenter
  })
  .config(routes);
