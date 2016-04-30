import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {Locations} from '/imports/api/locations';
import {Realty} from '/imports/api/realty';
import {name as realtyFilter} from '../realty-filter/realty-filter.component';

import {dictionary} from '../../../../api/dictionary/dictionary';
import './new-list.view.html';

class NewList {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    const vm = this;
    this.dictionary = dictionary;
    vm.perPage = 20;
    vm.page = 1;
    vm.sort = {
      'updated_at': -1
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
        return Realty.find({status: 'list'}, {sort: vm.getReactively('sort')});
      },
      // realtyCount: () => {
      //   return Counts.get('realtyCount');
      // }
    });
  }

}

const moduleName = 'newList';

// create a module
export default angular.module(moduleName, [
  realtyFilter,
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/new-list/new-list.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: NewList
});
