/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as ClientCard} from '/imports/ui/shared/client-card/client-card.component';
import './list-my-clients.view.html';
import {Clients} from '/imports/api/clients';

class ListMyClients {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    let vm = this;
    
    this.subscribe('listClients', () => {
        return [{status:'realtor'}]
    });
    this.helpers({
      clients() {
        return Clients.find();
      }
    });
    
  }

}

const moduleName = 'listMyClients';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  ClientCard
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/list-my-clients/list-my-clients.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ListMyClients
});

