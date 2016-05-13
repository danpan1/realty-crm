/**
 * Created by Danpan on 09.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './one-email.view.html';

class OneEmail {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'oneEmail';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-email/one-email.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: OneEmail
  });
