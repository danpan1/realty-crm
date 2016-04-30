/**
 * Created by Danpan on 01.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './login.view.html';

class Login {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'login';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/auth/login/login.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: Login
  })