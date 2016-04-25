import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as NewList} from './new-list/new-list.component.js';
import routes from './realty.routes.js';
import './realty.view.html';
const moduleName = 'realty';

class Realty {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

}
// create a module
export default angular.module(moduleName, [
  angularMeteor,
  NewList
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/realty.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Realty
}).config(routes);
