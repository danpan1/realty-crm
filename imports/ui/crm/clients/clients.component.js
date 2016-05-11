/**
 * Created by Danpan on 25.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as addClient} from './add-client/add-client.component';
import {name as listMyClients} from './list-my-clients/list-my-clients.component';
import {name as listHotClients} from './list-hot-clients/list-hot-clients.component';
import {name as currentClient} from '/imports/ui/shared/client-info/client-info.component';
import routes from './clients.routes';

import './clients.view.html';

class Clients {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    
    /*$scope.$on('sendingCurrentClient', function (event, data) {
        console.log(data); // Данные, которые нам прислали
    });*/
    
  }
  
}

const moduleName = 'clients';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  listMyClients,
  listHotClients,
  addClient,
  currentClient
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/clients/clients.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: Clients
  })
  .config(routes);
