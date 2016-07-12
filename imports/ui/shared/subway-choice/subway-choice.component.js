import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Locations} from '/imports/api/locations';
import {Meteor} from 'meteor/meteor';

import './subway-choice.view.html';

class SubwayChoice {
  constructor($scope, $reactive, $stateParams, $timeout) {
    'ngInject';

    $reactive(this).attach($scope);
    const vm = this;
    this.$timeout = $timeout;
    this.stateParams = $stateParams;
    this.searchText = this.subway ? this.subway.name : '';
    this.query = this.searchText;
    console.log(this.query);
    vm.subwaysSuggestionList = [];
    vm.subscribe('subwayChips', ()=> {
      return [{sort: {name: 1}, limit: 4}, vm.getReactively('query')];
    }, {
      onReady: function () {
        vm.subwaysSuggestionList = Locations.find({
          type: 'subway'
        }).fetch();
        console.log(vm.subwaysSuggestionList);
      }
    });

    this.$onChanges = function () {
      let checkRealty = function () {
        if(vm.subway){
          vm.searchText = vm.subway.name;
          vm.query = vm.searchText;
        }/* else {
          console.log('no way!')
          vm.$timeout(()=>{
            checkRealty();
          },200)
        }*/
      }
      checkRealty();
    }

  }

  changeChoice () {
    if(this.selectedSubway){
      console.log(this.subwaysSuggestionList);
      console.log(this.selectedSubway);
      this.subway = {
        id: this.selectedSubway._id,
        name: this.selectedSubway.name,
        line: this.selectedSubway.meta.lineId
      }
    }
  }

  searchTextChange(criteria) {
    if (typeof criteria === 'string' && criteria.length) {
      this.query = criteria;
    }
  }

}

const moduleName = 'subwayChoice';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: `imports/ui/shared/subway-choice/subway-choice.view.html`,
  controllerAs: moduleName,
  bindings: {
    subway: '=ngModel',
    subwaysChanged: '&',
    restart: '<'
  },
  controller: SubwayChoice
});
