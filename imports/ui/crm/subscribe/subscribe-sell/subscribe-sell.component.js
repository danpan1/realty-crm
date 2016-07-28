import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import './subscribe-sell.view.html';

class SubscribeSell {
  /* @ngInject */
  constructor($scope, $reactive, $mdDialog, $timeout, $state, $stateParams) {
    $reactive(this).attach($scope);
    let vm = this;

  }

}

const moduleName = 'subscribeSell';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/subscribe/subscribe-sell/subscribe-sell.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: SubscribeSell
});
  
