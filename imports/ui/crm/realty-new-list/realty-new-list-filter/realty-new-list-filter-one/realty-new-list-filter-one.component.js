/**
 * Created by Danpan on 01.06.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Locations} from '/imports/api/locations';
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

    if(this.filter.subways){
      this.getSubwaysNames();
    }

  }

  getSubwaysNames () {
    let vm = this;
    subwaysNames = [];
    vm.subscribe('subwayChips', ()=> {
      return [{sort: {name: 1}, limit: 4}, vm.getReactively('query'), this.filter.subways];
    }, {
      onReady: function () {
        if (!vm.loaded) {
          vm.subwaysNames = Locations.find({
            type: 'subway'
          }).fetch();
        }
      }
    });

    vm.helpers({
      subwaysNames () {
        return Locations.find({
          type: 'subway'
        });
      }
    });
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
