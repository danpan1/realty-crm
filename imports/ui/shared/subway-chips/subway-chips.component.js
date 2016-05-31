import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Locations} from '/imports/api/locations';
import {Meteor} from 'meteor/meteor';

import './subway-chips.view.html';

class SubwayChips {
  constructor($scope, $reactive, $stateParams) {
    'ngInject';

    $reactive(this).attach($scope);
    const vm = this;
    this.stateParams = $stateParams;
    vm.subwaysInForm = [];
    vm.subwaysSuggestionList = [];
    this.alreadyPicked = this.subwaysIdList || [];
    vm.subscribe('subwayChips', ()=> {
      return [{sort: {name: 1}, limit: 4}, vm.getReactively('query'), this.alreadyPicked];
    }, {
      onReady: function () {
        if (!vm.loaded) {
          vm.subwaysInForm = Locations.find({
            type: 'subway'
          }).fetch();
          let newList = [];
          let testList = typeof vm.stateParams.subways == 'object' ? vm.stateParams.subways : [vm.stateParams.subways];
          for(var f in vm.subwaysInForm){
            for(var s in testList){
              if(vm.subwaysInForm[f]._id == testList[s]){
                newList.push(vm.subwaysInForm[f]);
                break;
              }
            }
          }
          vm.subwaysInForm = newList;
        }
        vm.loaded = true;
      }
    });

    vm.helpers({
      subwaysSuggestionList () {
        return Locations.find({
          type: 'subway'
        });
      }
    });
  }

  changeChips() {
    this.loaded = true;
    this.subwaysIdList = this.subwaysInForm.map((item)=> {
      return item._id;
    });
    this.subwaysEmbeded = this.subwaysInForm.map((item)=> {
      return {name: item.name, line: item.meta.lineId};
    });
  }
  
  searchTextChange(criteria) {
    this.loaded = true;
    if (typeof criteria === 'string' && criteria.length) {
      // 
      this.query = criteria;
    }
    this.alreadyPicked = this.subwaysIdList;
    
  }

}

const moduleName = 'subwayChips';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: `imports/ui/shared/subway-chips/subway-chips.view.html`,
  controllerAs: moduleName,
  bindings: {
    subwaysIdList: '=ngModel',
    subwaysEmbeded: '='
  },
  controller: SubwayChips
});
