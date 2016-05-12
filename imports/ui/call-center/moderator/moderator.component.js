/**
 * Created by Danpan on 11.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './moderator.view.html';

class Moderator {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    // console.log('mode');
  }

}

const moduleName = 'moderator';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/call-center/moderator/moderator.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: Moderator
  });
