/**
 * Created by Danpan on 25.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './incoming-call.view.html';

class IncomingCall {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'incomingCall';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/call-center/incoming-call/incoming-call.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: IncomingCall
  })
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('call-center.incoming', {
      url: '/incoming',
      template: '<incoming-call/>'
    });
}
