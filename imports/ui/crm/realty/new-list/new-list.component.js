import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {name as realtyFilter} from '../realty-filter/realty-filter.component';

import './new-list.view.html';
import realty from './new-list-data';

class NewList {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);

    this.realty = realty;
    console.log(this.realty[0]);
  }

}

const moduleName = 'newList';

// create a module
export default angular.module(moduleName, [
  realtyFilter,
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/new-list/new-list.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: NewList
  });