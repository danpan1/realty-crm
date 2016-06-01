/**
 * Created by Danpan on 01.06.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Realty} from '/imports/api/realty';
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
  constructor($scope, $reactive, $location, $state, $stateParams) {
    $reactive(this).attach($scope);
    const vm = this;
    this.dictionary = dictionary;
    this.stateParams = $stateParams;
    vm.perPage = 20;
    vm.page = this.stateParams.page ? parseInt(this.stateParams.page) : 1;
    this.showSlider = false;
    this.slideShowImages = [];
    vm.sort = {
      // 'updated_at': -1
      'createdAt': -1
    };

    vm.subscribe('newList', () => {
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
          priceFrom: vm.getReactively('filter.priceFrom'),
          roomcount: vm.getReactively('roomcount'),
          type: vm.getReactively('filter.type'),
          subways: vm.getReactively('filter.subways'),
          districts: vm.getReactively('filter.districts')
        }
      ];
    }, {
      onReady: function () {
        vm.loaded = true;
      }
    });

    vm.helpers({
      realty: () => {
        return Realty.find({}, {sort: vm.getReactively('sort')});
      },
      realtyCount: () => {
        return Counts.get('realtyCount');
      },
      pagesCount: () => {
        return Math.ceil(Counts.get('realtyCount') / this.perPage);
      }
    });
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
