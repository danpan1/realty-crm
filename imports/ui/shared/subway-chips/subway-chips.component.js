import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Locations} from '/imports/api/locations';
import {Meteor} from 'meteor/meteor';

import './subway-chips.view.html';

class SubwayChips {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);
    const vm = this;
    vm.subwaysInForm = [];
    vm.alreadyPicked = this.subwaysIdList || [];
    vm.subscribe('subwayChips', ()=> {
      return [{sort: {name: 1}, limit: 4}, vm.getReactively('query'), vm.alreadyPicked];
    }, {
      onReady: function () {
        if (!vm.loaded) {
          vm.subwaysInForm = vm.subwaysSuggestionList;
        }
        vm.loaded = true;
      }
    });

    vm.helpers({
      subwaysSuggestionList () {
        console.log(Locations.find({}).fetch());
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
  }

  searchTextChange(criteria) {
    this.loaded = true;
    if (typeof criteria === 'string' && criteria.length) {
      // this.subwaysSuggestionList = [];
      this.query = criteria;
    }
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
    subwaysIdList: '=ngModel'
  },
  controller: SubwayChips
});
