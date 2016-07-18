import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as ClientFiltersList} from './client-filters-list/client-filters-list.component';
import {name as ClientFiltersChange} from './client-filters-change/client-filters-change.component';
import routes from './client-filters.routes.js';
import './client-filters.view.html';

class ClientFilters {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    const vm = this;
    this.loaded = true;
  }

}

const moduleName = 'clientFilters';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  ClientFiltersList,
  ClientFiltersChange
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/client-filters/client-filters.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientFilters
}).config(routes);
