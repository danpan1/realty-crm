import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as NewList} from './new-list/new-list.component';
import {name as inWorkList} from './in-work-list/in-work-list.component';
import {name as realtyListLayout} from './realty-list-layout/realty-list-layout.component';
import {name as realtyOneLayout} from './realty-one-layout/realty-one-layout.component';
import routes from './realty.routes.js';
import './realty.view.html';
const moduleName = 'realty';

class Realty {
  /* @ngInject */
  // constructor($scope, $reactive) {
  //   $reactive(this).attach($scope);
  // }

}
// create a module
export default angular.module(moduleName, [
  angularMeteor,
  realtyOneLayout,
  realtyListLayout,
  inWorkList,
  NewList
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/realty.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Realty
}).config(routes);
