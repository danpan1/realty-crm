/**
 * Created by Danpan on 01.06.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '/imports/helpers/dictionary';
import {Locations} from '/imports/api/locations';
import {name as realtyFilter} from '/imports/ui/crm/realty/realty-filter/realty-filter.component';
import {name as realtyNewListFilterOne} from './realty-new-list-filter-one/realty-new-list-filter-one.component';
import {Filters} from '/imports/api/filters';


import './realty-new-list-filter.view.html';

class RealtyNewListFilter {
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    const vm = this;
    this.dictionary = dictionary;

    vm.subscribe('myFilters', () => {
      return [];
    }, {
      onReady: function () {
        vm.$timeout(()=>{
        },100)  
        // subscriptionHandle.stop();  // Stopping the subscription, will cause onStop to fire
      }
    });

    this.newFilter = {
      filter:{},
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

    vm.$timeout(()=>{
      for(var f in this.myFilters){
        console.log(this.myFilters);
        if(this.myFilters[f].filter.conditions){
          this.myFilters[f].conditionNames = this.myFilters[f].filter.conditions.map((item) => {
            for(var d in vm.dictionary){
              if(vm.dictionary[d].id == item) return vm.dictionary[d].name;
            }
          })
        }
      }
    },1000);

  }

  useFilter (index) {
    this.$timeout(()=>{
      this.useSavedFilter({filter:this.myFilters[index].filter});
    },100);
    this.filterModalOpened = false;
  }
  
  changeFilter (index) {
    /*if(this.myFilters[index].filter.roomcount && typeof this.myFilters[index].filter.roomcount[0] == 'number'){
      this.myFilters[index].filter.roomcount = this.myFilters[index].filter.roomcount.map((item)=>{
        return this.dictionary.roomcount[item-1];
      })
    }*/

    console.log(this.myFilters[index].filter);
    this.newFilter = {
      filter: this.myFilters[index].filter,
      name: this.myFilters[index].name,
      id: this.myFilters[index]._id
    };
    this.changingFilter = index;
    this.showFilter = true;
  }

  deleteFilter (index) {
    Meteor.call('removeFilter', this.myFilters[index]._id, (error, result) => {
      if (error) {
        console.log('Ошибка!');
        console.log(error);
      } else {
        console.log(`Filter removed`);
      }
    });
  }


  saveNewFilter () {
    let vm = this;

    if (this.newFilter.filter.street == null) { delete this.newFilter.filter.street; }
    else if(this.newFilter.filter.street && typeof this.newFilter.filter.street != 'string') this.newFilter.filter.street = this.newFilter.filter.street.value;

    if (this.newFilter.filter.house == null) { delete this.newFilter.filter.house; }
    else if(this.newFilter.filter.house && typeof this.newFilter.filter.house != 'string') this.newFilter.filter.house = this.newFilter.filter.house.value;
    
    /*if (this.newFilter.filter.roomcount) {
      this.newFilter.filter.roomcount = this.newFilter.filter.roomcount.map((item) => {
        return parseInt(item.name);
      })
    }*/

    console.log(this.newFilter);

    if (this.changingFilter) {
      Meteor.call('changeFilter', this.newFilter, (error, result) => {
        if (error) {
          console.log(error);
          console.log('Ошибка!');
        } else {
          console.log(`Filter added : filter, ${vm.newFilter}`);
          this.showFilter = false;
          console.log('Все отлично!');
        }
      });
      this.changingFilter = undefined;
    } else {
      Meteor.call('addFilter', this.newFilter, (error, result) => {
        if (error) {
          console.log(error);
          console.log('Ошибка!');
        } else {
          console.log(`Filter added : filter, ${vm.newFilter}`);
          this.showFilter = false;
          console.log('Все отлично!');
        }
      });
    }
  }

  backToFiltersList () {
    if(this.changingFilter) this.changingFilter = undefined;
    this.showFilter = false;
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
