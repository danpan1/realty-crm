/**
 * Created by Danpan on 01.06.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '/imports/helpers/dictionary';
import {Locations} from '/imports/api/locations';


import './realty-new-list-filter.view.html';

class RealtyNewListFilter {
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    const vm = this;
    this.dictionary = dictionary;
  }
}

const moduleName = 'realtyNewListFilter';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty-new-list/realty-new-list-filter/realty-new-list-filter.view.html',
  bindings: {
    modal:'='
  },
  controllerAs: moduleName,
  controller: RealtyNewListFilter
});
