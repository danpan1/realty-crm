/**
 * Created by Danpan on 25.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as addClient} from './add-client/add-client.component';
import {name as ClientCard} from '/imports/ui/shared/client-card/client-card.component';
import {Clients} from '/imports/api/clients';
/*import {name as listMyClients} from './list-my-clients/list-my-clients.component';
import {name as listHotClients} from './list-hot-clients/list-hot-clients.component';*/
//import {name as currentClient} from '/imports/ui/shared/client-info/client-info.component';
import routes from './clients.routes';

import './clients.view.html';

class ClientsList {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    /*
    let vm = this;
    
    vm.onChangeFilterStatus('hot');*/
    
  }
     
  onChangeFilterStatus (status) {
      this.clients = [];
      this.subscribe('listClients', () => {
          return [{status:status}]
        });
      this.helpers({
        clients() {
          return Clients.find();
        }
      });
      console.log(this.clients);
  } 
  
}

const moduleName = 'clients';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  ClientCard,
  /*listMyClients,
  listHotClients,*/
  addClient/*,
  currentClient*/
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/clients/clients.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: ClientsList
  })
  .config(routes);
