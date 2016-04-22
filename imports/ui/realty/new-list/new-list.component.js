import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './new-list.view.html';

class NewList {
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'newList';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/realty/new-list/new-list.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: NewList
  })
  .config(config);

function config($stateProvider) {
  $stateProvider
    .state('realty.new-list', {
      url: '/new-list',
      template: '<new-list/>'
    });
}
