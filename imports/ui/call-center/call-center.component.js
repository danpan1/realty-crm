import angular from 'angular';
import angularMeteor from 'angular-meteor';
import routes from './call-center.routes';

import {name as outgoingCall} from './outgoing-call/outgoing-call.component';
import './call-center.view.html';

class CallCenter {
  /* @ngInject */
  // constructor($scope, $reactive) {
  //   $reactive(this).attach($scope);
  // }

}

const moduleName = 'callCenter';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  outgoingCall
]).component(moduleName, {
    templateUrl: 'imports/ui/call-center/call-center.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: CallCenter
  })
  .config(routes);
