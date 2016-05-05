/**
 * Created by Danpan on 25.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as addClient} from './add-client/add-client.component';
import routes from './clients.routes';

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
  angularMeteor,
  addClient
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/clients/clients.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: Clients
  })
  .config(routes);
