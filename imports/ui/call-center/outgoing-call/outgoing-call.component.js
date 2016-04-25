/**
 * Created by  Danpan on 25.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {name as subwayChips} from '/imports/ui/shared/subway-chips/subway-chips.component';

import './outgoing-call.view.html';

class OutgoingCall {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'outgoingCall';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  subwayChips
]).component(moduleName, {
    templateUrl: 'imports/ui/call-center/outgoing-call/outgoing-call.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: OutgoingCall
  });
