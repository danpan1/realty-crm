/**
 * Created by Danpan on 01.06.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Realty} from '/imports/api/realty';
import {CountsDan} from '/imports/api/counts';
import {Clients} from '/imports/api/clients';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {dictionary} from '../../../helpers/dictionary';
import {Locations} from '/imports/api/locations';
import {name as PaginationButtons} from '/imports/ui/shared/pagination-buttons/pagination-buttons.component';
import {name as realtyFilter} from '/imports/ui/crm/realty/realty-filter/realty-filter.component';
// import {Meteor} from 'meteor/meteor';

// import {name as realtyFilter} from '../realty/realty-filter/realty-filter.component';
// import {name as slideShow} from '/imports/ui/shared/slide-show/slide-show.component';


import './realty-new-list.view.html';

class RealtyNewList {
  /* @ngInject */
  constructor($scope, $reactive, $timeout, $location, $state, $stateParams, $mdDialog) {
    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    const vm = this;
    this.mdDialog = $mdDialog;
    this.dictionary = dictionary;
    this.stateParams = $stateParams;
    this.state = $state;
    
    switch ($stateParams.operation) {
      case 'rent':
        vm.selectedTab = 0;
        break;
      case 'sale':
        vm.selectedTab = 1;
        break;
      default:
        vm.selectedTab = 0;
    }
    
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        vm.user = user;
      }
    });
    
    this.realtyCount = 0;
    vm.perPage = 20;
    vm.page = this.stateParams.page ? parseInt(this.stateParams.page) : 1;
    this.showSlider = false;
    this.slideShowImages = [];
    vm.sort = {
      // 'updated_at': -1
      'createdAt': -1
    };
    let timeTestLoadData = new Date();
    let timeTestRender = new Date();
    vm.subscribe('newList', () => {
      vm.loaded = false;
      timeTestLoadData  = new Date();
      return [
        //фильтр для pagination
        {
          limit: parseInt(vm.perPage),
          skip: parseInt((vm.getReactively('page') - 1) * vm.perPage),
          sort: vm.getReactively('sort')
        },
        //фильтр клиента
        {
          floorFrom: vm.getReactively('filter.floorFrom'),
          floorTo: vm.getReactively('filter.floorTo'),
          priceTo: vm.getReactively('filter.priceTo'),
          street: vm.getReactively('filter.street.value'),
          conditions: vm.getReactively('filter.conditions'),
          priceFrom: vm.getReactively('filter.priceFrom'),
          roomcount: vm.getReactively('roomcount'),
          type: vm.getReactively('filter.type'),
          subways: vm.getReactively('filter.subways'),
          districts: vm.getReactively('filter.districts')
        }
      ];
    }, {
      onReady: function () {
        if(vm.stateParams.page > Math.ceil(vm.getReactively('realtyCount') / vm.perPage)) {
          vm.state.go('crm.realty-new-list', {page:1});
        }
        vm.$timeout(()=>{
          vm.loaded = true;
        },100)    
        let timeLoaded = new Date();
        let timeRender = new Date();
        console.log('время на закгрузку = ', ((timeLoaded - timeTestLoadData) / 1000));
        console.log('время на рендер = ', ((timeRender - timeTestRender) / 1000));
      }
    });

    vm.helpers({
      realty: () => {
        return Realty.find({}, {
          sort: vm.getReactively('sort')
        });
      },
      realtyCount: () => {
        let с = CountsDan.findOne({});
        if (с) {
          return с.count;
        } else {
          return '';
        }
      },
      pagesCount: () => {
        let с = CountsDan.findOne({});
        if (с) {
          return Math.ceil(с.count / this.perPage);
        } else {
          return '';
        }
      }
    });

  }

  openPurchaseSuccess(ev) {
    // Если совершена покупка, открываем окно с сообщением
    if(this.stateParams.purchase){
      let vm = this;
      this.mdDialog.show(
        this.mdDialog.alert()
          .parent(angular.element(document.querySelector('body')))
          .clickOutsideToClose(true)
          .title('Успешно оплачено')
          .textContent('Вы успешно оплатили ' + vm.stateParams.purchase + ' объектов')
          .ariaLabel('Alert Purchase Success')
          .ok('Продолжить брать объекты')
          .targetEvent(ev)
      );
    }
  }

  setSliderImages(images) {
    console.log(images);
    this.showSlider = true;
    this.slideShowImages = images;
  }

}

const moduleName = 'realtyNewList';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  realtyFilter,
  PaginationButtons
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty-new-list/realty-new-list.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: RealtyNewList
});
