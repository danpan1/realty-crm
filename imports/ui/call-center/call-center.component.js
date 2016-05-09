import angular from 'angular';
import angularMeteor from 'angular-meteor';
import routes from './call-center.routes';

import {name as outgoingCall} from './outgoing-call/outgoing-call.component';

const moduleName = 'callCenter';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  outgoingCall
])
  .config(routes);
