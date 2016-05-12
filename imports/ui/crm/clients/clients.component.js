/**
 * Created by Danpan on 25.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as addClient} from './add-client/add-client.component';
import {name as ClientCard} from '/imports/ui/shared/client-card/client-card.component';
import {Clients} from '/imports/api/clients';
import {name as listMyClients} from './list-my-clients/list-my-clients.component';
import {name as clientDetails} from './client-details/client-details.component';
import {name as clientConnections} from './client-details/client-connections/client-connections.component';
import {name as clientDemonstration} from './client-details/client-demonstration/client-demonstration.component';
import {name as clientEmail} from './client-details/client-email/client-email.component';
import {name as clientInfo} from './client-details/client-info/client-info.component';
//import {name as currentClient} from '/imports/ui/shared/client-info/client-info.component';
import routes from './clients.routes';

import './clients.view.html';

class ClientsList {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  } 
  
}

const moduleName = 'clients';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  listMyClients,
  addClient,
  clientDetails,
  clientConnections,
  clientDemonstration,
  clientEmail,
  clientInfo
  //currentClient
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/clients/clients.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: ClientsList
  })
  .config(routes);
