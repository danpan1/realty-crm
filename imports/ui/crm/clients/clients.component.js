/**
 * Created by Danpan on 25.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './clients.view.html';

class Clients {
  /* @ngInject */
  // constructor($scope, $reactive) {
  //   $reactive(this).attach($scope);
  // }

}

const moduleName = 'clients';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/clients/clients.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: Clients
  })
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('crm.clients', {
      url: '/clients',
      template: '<clients/>'
    });
}
