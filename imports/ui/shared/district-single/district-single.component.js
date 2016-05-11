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
    vm.alreadyPicked = this.districtId || [];
    console.log(vm.alreadyPicked);
    vm.subscribe('district', ()=> {
      return [{sort: {name: 1}, limit: 4}, vm.getReactively('searchTextStreet'), vm.alreadyPicked];
    }, {
      onReady: function () {
        if (!vm.loaded) {
          vm.districtId = Locations.find({
            type: 'district'
          }).fetch();
        }
        vm.loaded = true;
      }
    });

    vm.helpers({
      districtsAreaSuggestionList () {
        // console.log(Locations.find({}).fetch());
        return Locations.find({
          type: 'district'
        });
      }
    });
  }

}

const moduleName = 'districtSingle';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/shared/district-single/district-single.view.html',
    bindings: {
      districtId: '=ngModel'
    },
    controllerAs: moduleName,
    controller: DistrictSingle
  });
