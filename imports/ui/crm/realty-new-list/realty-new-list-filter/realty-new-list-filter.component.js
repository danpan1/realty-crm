/**
 * Created by Danpan on 01.06.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '/imports/helpers/dictionary';
import {CountsDan} from '/imports/api/counts';
import {Locations} from '/imports/api/locations';
import {name as realtyFilter} from '/imports/ui/crm/realty/realty-filter/realty-filter.component';
import {name as realtyNewListFilterOne} from './realty-new-list-filter-one/realty-new-list-filter-one.component';
import {Filters} from '/imports/api/filters';


import './realty-new-list-filter.view.html';

class RealtyNewListFilter {
  /* @ngInject */
  constructor($scope, $reactive, $timeout, $mdDialog) {
    $reactive(this).attach($scope);
    this.mdDialog = $mdDialog;
    this.$timeout = $timeout;
    const vm = this;
    this.loaded = true;
    this.dictionary = dictionary;

    vm.subscribe('myFilters', () => {
      this.loaded = false;
      return [];
    }, {
      onReady: function () {
        vm.$timeout(()=>{
          this.myFilters = Filters.find().fetch();
          for (var i in this.myFilters) {
            this.getSubwaysNames(i);
          }
          this.loaded = true;
        })  
      }
    });

    this.newFilter = {
      filter:{
        metroTransport: 0
      },
      name:'',
      user: {
        id: this.user._id,
        phone: this.user.profile.phone
      }
    };

    vm.helpers({
      myFilters: () => {
        return Filters.find();
      }
    });

    if(this.user.profile.getSmsPremiumObjects == undefined) this.user.profile.getSmsPremiumObjects = true;

    
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

  getSubwaysNames(index) {
    let vm = this;
    vm.foundSubwaysNames = [];
    this.myFilters[index].filter.subwaysNames = [];
    vm.subscribe('subwayChips', ()=> {
      return [{}, vm.getReactively('query'), vm.myFilters[index].filter.subways];
    }, {
      onReady: function () {
        vm.foundSubwaysNames = Locations.find({
          type: 'subway'
        }).fetch();
        for(var i in vm.foundSubwaysNames){
          if(vm.myFilters[index].filter.subways.indexOf(vm.foundSubwaysNames[i]._id) > -1) vm.myFilters[index].filter.subwaysNames.push(vm.foundSubwaysNames[i].name)
        }
        //this.myFilters[index].filter.subwaysNames = vm.foundSubwaysNames;
        console.log(vm.myFilters[index].filter.subwaysNames);
      }
    });
  }

  checkSmsIsActive () {
    for(var f in this.myFilters){
      if(this.myFilters[f].isActive == undefined) {
        this.myFilters[f].isActive = true;
        this.saveNewFilter(f);
      }
    }
  }

  useFilter (index) {
    this.$timeout(()=>{
      this.useSavedFilter({filter:this.myFilters[index].filter});
      this.filterModalOpened = false;
    },100);
  }
  
  createFilter () {
    this.refresh = !this.refresh;
    this.newFilter = {
      filter:{
        metroTransport: 0
      },
      name:'',
      user: {
        id: this.user._id,
        phone: this.user.profile.phone
      }
    };
    this.showFilter = true; 
  }

  changeFilter (index) {
    this.newFilter = {
      filter: this.myFilters[index].filter,
      name: this.myFilters[index].name,
      id: this.myFilters[index]._id,
      user: {
        id: this.user._id,
        phone: this.user.profile.phone
      }
    };
    this.roomcount = this.newFilter.filter.roomcount;
    this.changingFilter = index;
    this.refresh = !this.refresh;
    this.showFilter = true;
  }

  changeFilterSms (index) {
    let filter = this.myFilters[index]
    console.log(this.myFilters[index].isActive);
    Meteor.call('changeFilterSms', filter._id, filter.isActive, (error, result) => {
      if (error) {
        console.log('Filter sms error!');
        console.log(error);
      } else {
        console.log(`Filter sms changed`);
      }
    });
  }


  deleteFilter(index, ev) {
    let vm = this;
    //console.log(angular.element(document.querySelector('#openArchiveDialog')));
    var confirm = this.mdDialog.confirm()
      .parent(angular.element(document.body))
      .clickOutsideToClose(true)
      .title('Удалить фильтр')
      .textContent('Фильтр будет удален, вы уверены?')
      .ariaLabel('Filter deleting confirmation')
      .ok('Да')
      .cancel('Нет')
      .targetEvent(ev);
    this.mdDialog.show(confirm).then(function () {
      vm.deleteFilterConfirm(index)
    })
  }

  deleteFilterConfirm (index) {
    Meteor.call('removeFilter', this.myFilters[index]._id, (error, result) => {
      if (error) {
        console.log('Ошибка!');
        console.log(error);
      } else {
        console.log(`Filter removed`);
      }
    });
  }


  saveNewFilter (filterIndex) {
    let vm = this;

    this.newFilter.filter.roomcount = this.roomcount; 

    if (this.newFilter.filter.street == null) { delete this.newFilter.filter.street; }
    else if(this.newFilter.filter.street && typeof this.newFilter.filter.street != 'string') this.newFilter.filter.street = this.newFilter.filter.street.value;

    if (this.newFilter.filter.house == null) { delete this.newFilter.filter.house; }
    else if(this.newFilter.filter.house && typeof this.newFilter.filter.house != 'string') this.newFilter.filter.house = this.newFilter.filter.house.value;
    
    if (filterIndex) {
      this.changingFilter = filterIndex;
      this.newFilter = {
        filter: this.myFilters[filterIndex].filter,
        name: this.myFilters[filterIndex].name,
        id: this.myFilters[filterIndex]._id,
        user: {
          id: this.user._id,
          phone: this.user.profile.phone
        }
      };
    }
    console.log(this.newFilter);

    if (this.changingFilter != undefined) { 
      Meteor.call('changeFilter', this.newFilter, (error, result) => {
        if (error) {
          console.log(error);
          console.log('Ошибка!');
        } else {
          console.log(`Filter changed`);
          this.$timeout(()=>{
            this.showFilter = false;
          },10)
        }
      });
      this.changingFilter = undefined;
    } else {
      Meteor.call('addFilter', this.newFilter, (error, result) => {
        if (error) {
          console.log(error);
          console.log('Ошибка!');
        } else {
          console.log(`Filter added`);
          this.$timeout(()=>{
            this.showFilter = false;
          },10)
        }
      });
    }
  }

  backToFiltersList () {
    if(this.changingFilter != undefined) this.changingFilter = undefined;
    this.showFilter = false;
  }

  changeUserGetSmsPremium (isActive) {
    Meteor.call('changeUserGetSmsPremium', isActive, (error, result) => {
      if (error) {
        console.log('Ошибка!');
        console.log(error);
      } else {
        console.log(`UserGetSmsPremium changed`);
      }
    });
  }

}

const moduleName = 'realtyNewListFilter';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  realtyFilter,
  realtyNewListFilterOne
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty-new-list/realty-new-list-filter/realty-new-list-filter.view.html',
  bindings: {
    modal:'=',
    user:'<',
    useSavedFilter:'&',
    filterModalOpened:'='
  },
  controllerAs: moduleName,
  controller: RealtyNewListFilter
});
