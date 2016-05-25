/**
 * Created by Danpan on 09.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as ClientCard} from '/imports/ui/shared/client-card/client-card.component';
import {Clients} from '/imports/api/clients';
import {Realty} from '/imports/api/realty';

import './one-connections.view.html';

class OneConnections {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  const vm = this;

    this.subscribe('relationClients', ()=> {
      return [vm.getReactively('realty.relations')];
    });

    this.helpers({
      clients() {
        return Clients.find({});
      },
      realty() {
        return Realty.findOne({});
      }
    });
  }

}

const moduleName = 'oneConnections';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  ClientCard
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/one-connections/one-connections.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: OneConnections
});
