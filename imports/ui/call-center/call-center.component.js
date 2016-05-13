import angular from 'angular';
import angularMeteor from 'angular-meteor';
import routes from './call-center.routes';

import {name as outgoingCall} from './outgoing-call/outgoing-call.component';
import {name as incomingCall} from './incoming-call/incoming-call.component';
import {name as moderator} from './moderator/moderator.component';

const moduleName = 'callCenter';

// create a module
export default angular.module(moduleName, [
    angularMeteor,
    incomingCall,
    moderator,
    outgoingCall
  ])
  .config(routes);
