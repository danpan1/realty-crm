import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Locations} from '/imports/api/locations'
import {Meteor} from 'meteor/meteor';

import './subwayChips.web.html';

/**
 * subwayChips component
 */
class SubwayChips {
  constructor($scope, $reactive, $q) {
    'ngInject';

    $reactive(this).attach($scope);
    // this.picked
    const vm = this;
    vm.subwaysInForm = [];
    vm.alreadyPicked = this.subwaysIdList || [];
    // vm.query = "Тре";
    vm.subscribe('subwayChips', ()=> {
      return [{sort: {name: 1}, limit: 4}, vm.getReactively('query'), vm.alreadyPicked]
    }, {
      onReady: function() {
        if(!vm.loaded) vm.subwaysInForm = vm.subwaysSuggestionList;
        vm.loaded = true;
      }
    });

    vm.helpers({
      subwaysSuggestionList (){
        console.log(Locations.find({}).fetch());
        return Locations.find({
          type: 'subway'
        });
      }
    });
  }


  change(chip) {
    this.loaded = true;
    this.subwaysIdList = this.subwaysInForm.map((item)=> {
      return item._id
    });
  }

  searchTextChange(criteria) {
    this.loaded = true;
    if(typeof criteria === 'string' && criteria.length) {
      // this.subwaysSuggestionList = [];
      this.query = criteria;
    }
  }

}

const name = 'subwayChips';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/core/${name}/${name}.web.html`,
  controllerAs: name,
  bindings: {
    subwaysIdList: "=ngModel"
  },
  controller: SubwayChips
});