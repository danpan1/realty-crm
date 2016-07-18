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
    
    if(this.filter.filter.conditions){
      this.conditionNames = this.filter.filter.conditions.map((item) => {
        for(var d in vm.dictionary){
          if(vm.dictionary[d].id == item) return vm.dictionary[d].name;
        }
      })
    }

    if(this.filter.filter) {
      this.getSubwaysNames();
    }

  }

  getSubwaysNames() {
    let vm = this;
    vm.foundSubwaysNames = [];
    this.filter.filter.subwaysNames = [];
    vm.subscribe('subwayChips', ()=> {
      return [{}, vm.getReactively('query'), vm.filter.filter.subways];
    }, {
      onReady: function () {
        vm.foundSubwaysNames = Locations.find({
          type: 'subway'
        }).fetch();
        for(var i in vm.foundSubwaysNames){
          if(vm.filter.filter.subways.indexOf(vm.foundSubwaysNames[i]._id) > -1) vm.filter.filter.subwaysNames.push(vm.foundSubwaysNames[i].name)
        }
        console.log(vm.filter.filter.subwaysNames);
      }
    });
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
