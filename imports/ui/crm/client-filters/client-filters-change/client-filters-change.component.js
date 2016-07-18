import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {CountsDan} from '/imports/api/counts';
import {Locations} from '/imports/api/locations';
import {dictionary} from '/imports/helpers/dictionary';


import './client-filters-change.view.html';

class ClientFiltersChange {
  /* @ngInject */
  constructor($scope, $reactive, $timeout, $state, $stateParams) {
    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    this.$stateParams = $stateParams;
    const vm = this;
    this.dictionary = dictionary;
    
    // После определения юзера создаем объект фильтра
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        vm.user = user;
        if(this.user.profile.getSmsPremiumObjects == undefined) this.user.profile.getSmsPremiumObjects = true;
        if (this.$stateParams.newFilter == 'false' && window.localStorage["changeFilter"] != undefined) {
          console.log(JSON.parse(window.localStorage["changeFilter"]));
          vm.newFilter = JSON.parse(window.localStorage["changeFilter"]);
        } else {
          vm.newFilter = {
            filter:{
              metroTransport: 0,
              roomcount: []
            },
            name:''
          };
        }
        vm.newFilter.user = {
            id: vm.user._id,
            phone: vm.user.profile.phone
        } 
        vm.roomcount = vm.newFilter.filter.roomcount;
      }
    });

    this.realtyCount = 0;
    vm.subscribe('newList', () => {
      return [
        //фильтр для pagination
        {},
        //фильтр клиента
        {
          floorFrom: vm.getReactively('newFilter.filter.floorFrom'),
          floorTo: vm.getReactively('newFilter.filter.floorTo'),
          squareFrom: vm.getReactively('newFilter.filter.squareFrom'),
          squareTo: vm.getReactively('newFilter.filter.squareTo'),
          priceTo: vm.getReactively('newFilter.filter.priceTo'),
          metroTime: vm.getReactively('newFilter.filter.metroTime'),
          metroTransport: vm.getReactively('newFilter.filter.metroTransport'),
          street: vm.getReactively('newFilter.filter.street.value'),
          house: vm.getReactively('newFilter.filter.house.value'),
          conditions: vm.getReactively('newFilter.filter.conditions'),
          renovation: vm.getReactively('newFilter.filter.renovation'),
          materials: vm.getReactively('newFilter.filter.materials'),
          priceFrom: vm.getReactively('newFilter.filter.priceFrom'),
          roomcount: vm.getReactively('roomcount'),
          type: vm.getReactively('newFilter.filterType'),
          subways: vm.getReactively('newFilter.filter.subways'),
          districts: vm.getReactively('newFilter.filter.districts')
        }
      ];
    }, {
      onReady: function () {}
    });

    vm.helpers({
      realtyCount: () => {
        let с = CountsDan.findOne({});
        if (с) {
          return с.count;
        } else {
          return '';
        }
      }
    });
  }

  saveNewFilter () {
    let vm = this;

    //this.newFilter.filter.roomcount = this.roomcount; 

    if (this.newFilter.filter.street == null) { delete this.newFilter.filter.street; }
    else if(this.newFilter.filter.street && typeof this.newFilter.filter.street != 'string') this.newFilter.filter.street = this.newFilter.filter.street.value;

    if (this.newFilter.filter.house == null) { delete this.newFilter.filter.house; }
    else if(this.newFilter.filter.house && typeof this.newFilter.filter.house != 'string') this.newFilter.filter.house = this.newFilter.filter.house.value;
    
    vm.savingInProgress = true;
    if (this.$stateParams.newFilter == 'false') {
      Meteor.call('changeFilter', this.newFilter, (error, result) => {
        if (error) {
          console.log(error);
          console.log('Ошибка!');
          vm.savingInProgress = false;
        } else {
          console.log(`Filter changed`);
          vm.savingInProgress = false;
        }
      });
    } else {
      Meteor.call('addFilter', this.newFilter, (error, result) => {
        if (error) {
          console.log(error);
          console.log('Ошибка!');
          vm.savingInProgress = false;
        } else {
          console.log(`Filter added`);
          vm.savingInProgress = false;
        }
      });
    }
  }

}

const moduleName = 'clientFiltersChange';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/client-filters/client-filters-change/client-filters-change.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientFiltersChange
});
