/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './client-info.view.html';

class ClientInfo {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    console.log(this.currentclient);
  }
}

const moduleName = 'clientInfo';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/client-info/client-info.view.html',
  bindings: {currentclient: '<'},
  controllerAs: moduleName,
  controller: ClientInfo
});

