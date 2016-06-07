/**
 * Created by Danpan on 07.06.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './otchet.view.html';

class Otchet {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}

const moduleName = 'otchet';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/call-center/otchet/otchet.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Otchet
});

