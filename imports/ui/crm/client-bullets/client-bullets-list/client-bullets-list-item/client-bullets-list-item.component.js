import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Locations} from '/imports/api/locations';
import {dictionary} from '/imports/helpers/dictionary';


import './client-bullets-list-item.view.html';

class ClientBulletsListItem {
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    const vm = this;
    this.dictionary = dictionary;
    
    // if(this.filter.filter.conditions){
    //   this.conditionNames = this.filter.filter.conditions.map((item) => {
    //     for(var d in vm.dictionary){
    //       if(vm.dictionary[d].id == item) return vm.dictionary[d].name;
    //     }
    //   })
    // }

    if(this.bullet.filter) {
      this.getSubwaysNames();
      this.getDistrictsNames();
    }

  }

  getSubwaysNames() {
    let vm = this;
    vm.foundSubwaysNames = [];
    this.bullet.filter.subwaysNames = [];
    vm.subscribe('subwayChips', ()=> {
      return [{}, vm.getReactively('query'), vm.bullet.filter.subways];
    }, {
      onReady: function () {
        vm.foundSubwaysNames = Locations.find({
          type: 'subway'
        }).fetch();
        for(var i in vm.foundSubwaysNames){
          if(vm.bullet.filter.subways.indexOf(vm.foundSubwaysNames[i]._id) > -1) vm.bullet.filter.subwaysNames.push(vm.foundSubwaysNames[i].name)
        }
        console.log(vm.bullet.filter.subwaysNames);
      }
    });
  }

  getDistrictsNames() {
    let vm = this;
    vm.foundDistrictsNames = [];
    this.bullet.filter.districtsNames = [];
    vm.subscribe('districtsAreaChips', ()=> {
      return [{}, vm.getReactively('query'), vm.bullet.filter.districts];
    }, {
      onReady: function () {
        vm.foundDistrictsNames = Locations.find({
          type: {$in: ['district', 'area']}
        }).fetch();
        for(var i in vm.foundDistrictsNames){
          if(vm.bullet.filter.districts.indexOf(vm.foundDistrictsNames[i]._id) > -1) vm.bullet.filter.districtsNames.push(vm.foundDistrictsNames[i].name)
        }
        console.log(vm.bullet.filter.districtsNames);
      }
    });
  }

}

const moduleName = 'clientBulletsListItem';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/client-bullets/client-bullets-list/client-bullets-list-item/client-bullets-list-item.view.html',
  bindings: {
    bullet: '<'
  },
  controllerAs: moduleName,
  controller: ClientBulletsListItem
});
