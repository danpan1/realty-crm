/**
 * Created by Danpan on 30.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {Locations} from '/imports/api/locations';
import {Meteor} from 'meteor/meteor';

import './district-chips.view.html';

class DistrictChips {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);
    const vm = this;
    vm.districtsAreaInForm = [];
    vm.alreadyPicked = this.districtsAreaIdList || [];
    console.log(vm.alreadyPicked);
    vm.subscribe('districtsAreaChips', ()=> {
      return [{sort: {name: 1}, limit: 4}, vm.getReactively('query'), vm.alreadyPicked];
    }, {
      onReady: function () {
        if (!vm.loaded) {
          vm.districtsAreaInForm = Locations.find({
            type: {$in: ['district', 'area']}
          }).fetch();;
        }
        vm.loaded = true;
      }
    });

    vm.helpers({
      districtsAreaSuggestionList () {
        // console.log(Locations.find({}).fetch());
        return Locations.find({
          type: {$in: ['district', 'area']}
        });
      }
    });
  }

  changeChips() {
    this.loaded = true;
    this.districtsAreaIdList = this.districtsAreaInForm.map((item)=> {
      return item._id;
    });
    this.districtsEmbeded = this.districtsAreaInForm.map((item)=> {
      return item.name;
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

const moduleName = 'districtChips';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/shared/district-chips/district-chips.view.html',
    bindings: {
      districtsAreaIdList: '=ngModel',
      districtsEmbeded: '='
    },
    controllerAs: moduleName,
    controller: DistrictChips
  });