/**
 * Created by Danpan on 23.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './documents.view.html';

class Documents {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'documents';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/documents/documents.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Documents
})
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('crm.documents', {
      url: '/documents',
      template: '<documents/>'
    });
}
