import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Locations} from '/imports/api/locations';
import {dictionary} from '/imports/helpers/dictionary';
import {Filters} from '/imports/api/filters'
import {name as ClientFiltersListItem} from './client-filters-list-item/client-filters-list-item.component';

import './client-filters-list.view.html';

class ClientFiltersList {
  /* @ngInject */
  constructor($scope, $reactive, $timeout, $mdDialog, $state) {
    $reactive(this).attach($scope);
    this.$state = $state;
    this.$timeout = $timeout;
    this.mdDialog = $mdDialog;
    const vm = this;
    this.dictionary = dictionary;
    
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        vm.user = user;
        if(this.user.profile.getSmsPremiumObjects == undefined) this.user.profile.getSmsPremiumObjects = true;
      }
    });

    vm.subscribe('myFilters', () => {
      this.loaded = false;
      return [];
    }, {
      onReady: function () {
        vm.$timeout(()=>{
          this.myFilters = Filters.find().fetch();
          this.loaded = true;
        })  
      }
    });

    vm.helpers({
      myFilters: () => {
        return Filters.find();
      }
    });


    /*if(this.filter.subways){
      this.getSubwaysNames();
    }*/

  }

  changeFilter (index) {

    /*this.newFilter = {
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
    this.showFilter = true;*/

    console.log(this.myFilters[index]);   

    window.localStorage["changeFilter"] = JSON.stringify(this.myFilters[index], function (key, val) {
      if (key == '$$hashKey') {
        return undefined;
      }
      return val;
    });

    this.$state.go('crm.client-filters.change', {newFilter: false}) ;
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

  checkSmsIsActive () {
    for(var f in this.myFilters){
      if(this.myFilters[f].isActive == undefined) {
        this.myFilters[f].isActive = true;
        this.saveNewFilter(f);
      }
    }
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

  useFilter (index) {
    this.$timeout(()=>{
      //this.useSavedFilter({filter:this.myFilters[index].filter});
    },100);
  }

}

const moduleName = 'clientFiltersList';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  ClientFiltersListItem
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/client-filters/client-filters-list/client-filters-list.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientFiltersList
});
