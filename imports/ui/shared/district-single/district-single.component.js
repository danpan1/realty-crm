/**
 * Created by Danpan on 11.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {Locations} from '/imports/api/locations';
import {Meteor} from 'meteor/meteor';
import './district-single.view.html';

class DistrictSingle {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    const vm = this;
    vm.districtsAreaInForm = [];
    vm.alreadyPicked = this.district || [];
    console.log(vm.alreadyPicked);
    vm.subscribe('district', ()=> {
      return [{sort: {name: 1}, limit: 4}, vm.getReactively('searchTextStreet'), vm.alreadyPicked];
    }, {
      onReady: function () {
        if (!vm.loaded) {
          vm.district = Locations.findOne({
            type: 'district'
          });
        }
        vm.loaded = true;
      }
    });
    vm.subscribe('area', ()=> {
      return [vm.getReactively('areaId')];
    });

    vm.helpers({
      districtsAreaSuggestionList () {
        // console.log(Locations.find({}).fetch());
        return Locations.find({
          type: 'district'
        });
      },
      area(){
        return Locations.findOne({
          type: 'area'
        });
      }
    });
  }

  changeArea() {
    if (this.district) {
      this.areaId = this.district.parents[1];
    }
  }
}

const moduleName = 'districtSingle';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/district-single/district-single.view.html',
  bindings: {
    district: '=ngModel',
    area: '='
  },
  controllerAs: moduleName,
  controller: DistrictSingle
});
