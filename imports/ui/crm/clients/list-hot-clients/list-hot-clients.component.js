/**
 * Created by Danpan on 09.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as ClientCard} from '/imports/ui/shared/client-card/client-card.component';
import './list-hot-clients.view.html';
import {Clients} from '/imports/api/clients';

class ListHotClients {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    let vm = this;

    this.subscribe('listClients', () => {
        return [{status:'hot',realtorId:true}, vm.getReactively('query')]
    });

    this.helpers({
      clients() {
        return Clients.find();
      }
    });
  }

}

const moduleName = 'listHotClients';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/clients/list-hot-clients/list-hot-clients.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: ListHotClients
  });/*
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('clients.list.hot', {
      url: '/hot',
      template: '<list-hot-clients/>'
    });
}*/
