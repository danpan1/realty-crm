/**
 * Created by Danpan on 30.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {Locations} from '/imports/api/locations';
import {Meteor} from 'meteor/meteor';

import './disctrict-chips.view.html';

class DisctrictChips {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);
    const vm = this;
    vm.districtsAreaInForm = [];
    vm.alreadyPicked = this.discrictsAreaIdList || [];
    vm.subscribe('disctrictAreaChips', ()=> {
      return [{sort: {name: 1}, limit: 4}, vm.getReactively('query'), vm.alreadyPicked];
    }, {
      onReady: function () {
        if (!vm.loaded) {
          vm.districtsAreaInForm = vm.districtsAreaSuggestionList;
        }
        vm.loaded = true;
      }
    });

    vm.helpers({
      districtsAreaSuggestionList () {
        console.log(Locations.find({}).fetch());
        return Locations.find({
          type: {$in: ['district', 'area']}
        });
      }
    });
  }

  changeChips() {
    this.loaded = true;
    this.discrictsAreaIdList = this.districtsAreaInForm.map((item)=> {
      return item._id;
    });
  }

  searchTextChange(criteria) {
    this.loaded = true;
    if (typeof criteria === 'string' && criteria.length) {
      // this.districtsAreaSuggestionList = [];
      this.query = criteria;
    }
  }

}

const moduleName = 'disctrictChips';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/shared/disctrict-chips/disctrict-chips.view.html',
    bindings: {
      discrictsAreaIdList: '=ngModel'
    },
    controllerAs: moduleName,
    controller: DisctrictChips
  });
