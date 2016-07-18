import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Locations} from '/imports/api/locations';
import {dictionary} from '/imports/helpers/dictionary';


import './client-filters-list-item.view.html';

class ClientFiltersListItem {
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

    /*if(this.filter.subways){
      this.getSubwaysNames();
    }*/

  }



}

const moduleName = 'clientFiltersListItem';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/client-filters/client-filters-list/client-filters-list-item/client-filters-list-item.view.html',
  bindings: {
    filter: '<'
  },
  controllerAs: moduleName,
  controller: ClientFiltersListItem
});
