/**
 * Created by Danpan on 01.06.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '/imports/helpers/dictionary';


import './realty-new-list-filter-one.view.html';

class RealtyNewListFilterOne {
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    const vm = this;
    this.dictionary = dictionary;
    
    if(this.filter.conditions){
      this.conditionNames = this.filter.conditions.map((item) => {
        for(var d in vm.dictionary){
          if(vm.dictionary[d].id == item) return vm.dictionary[d].name;
        }
      })
    }

  }

}

const moduleName = 'realtyNewListFilterOne';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty-new-list/realty-new-list-filter/realty-new-list-filter-one/realty-new-list-filter-one.view.html',
  bindings: {
    filter: '<'
  },
  controllerAs: moduleName,
  controller: RealtyNewListFilterOne
});
