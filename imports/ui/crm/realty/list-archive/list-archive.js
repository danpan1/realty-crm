/**
 * Created by Danpan on 09.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './list-archive.view.html';

class ListArchive {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'listArchive';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/list-archive/list-archive.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: ListArchive
  })
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('realty.list', {
      url: '/archive',
      template: '<list-archive/>'
    });
}
