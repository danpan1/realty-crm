/**
 * Created by Danpan on 09.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './list-hot-clients.view.html';

class ListHotClients {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'listHotClients';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/clients/list-hot-clients/list-hot-clients.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: ListHotClients
  });/*
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('clients.list.hot', {
      url: '/hot',
      template: '<list-hot-clients/>'
    });
}*/
