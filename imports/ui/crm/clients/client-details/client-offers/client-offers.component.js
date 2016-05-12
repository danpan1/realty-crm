/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './client-offers.view.html';

class ClientOffers {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
  }
}

const moduleName = 'clientOffers';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-offers/client-offers.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientOffers
});

