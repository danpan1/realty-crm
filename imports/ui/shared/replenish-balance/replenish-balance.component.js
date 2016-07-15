/**
 * Created by Danpan on 15.07.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './replenish-balance.view.html';

class ReplenishBalance {
  /* @ngInject */
  constructor($mdDialog) {
  }

}

const moduleName = 'replenishBalance';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/replenish-balance/replenish-balance.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ReplenishBalance
});
