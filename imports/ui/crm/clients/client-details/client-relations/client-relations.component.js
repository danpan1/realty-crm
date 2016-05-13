/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Realty} from '/imports/api/realty';
import {name as realtyCard} from '/imports/ui/shared/realty-card/realty-card.component';

import './client-relations.view.html';

class ClientRelations {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
    var vm = this;
    vm.assort = $stateParams.assort ? $stateParams.assort : 'manual' ;
    vm.selectedTab = '';
    switch($stateParams.assort){
        case 'manual':
            vm.selectedTab = 0;
            break;
        case 'auto':
            vm.selectedTab = 1;
            break;
        default:
            vm.selectedTab = 0;
    }   
    
    
    vm.perPage = 20;
    vm.page = 1;
    this.showSlider = false;
    this.slideShowImages = [];
    vm.sort = {
      'parseDetails.UID': -1
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
      realtyCount: () => {
        return Counts.get('realtyCount');
      }
    });
    
  }
}

const moduleName = 'clientRelations';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  realtyCard
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-relations/client-relations.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientRelations
});

