/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Realty} from '/imports/api/realty';
import {Clients} from '/imports/api/clients';
import {Counts} from 'meteor/tmeasday:publish-counts';

import './client-connections.view.html';

class ClientConnections {
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
    
    vm.perPage = 5;
    vm.page = 1;
    this.showSlider = false;
    this.slideShowImages = [];
    vm.sort = {
      'updatedAt': -1
    };

    vm.subscribe('relationsListInClient', () => {
      return [
        //фильтр для pagination
        {
          limit: parseInt(vm.perPage),
          skip: parseInt((vm.getReactively('page') - 1) * vm.perPage),
          sort: vm.getReactively('sort')
        },vm.getReactively('client.relations')
      ];
    }, {
      onReady: function () {
        vm.loaded = true;
      }
    });

    vm.helpers({
      client: () => {
        return Clients.findOne({});
      },
      realty: () => {
        return Realty.find({}, {sort: vm.getReactively('sort')});
      },
      realtyCount: () => {
        return Counts.get('realtyCount');
      }
    });
    
  }
  
  setSliderImages(images) {
      console.log(images);
      this.showSlider = true;
      this.slideShowImages = images;
  }
  
}

const moduleName = 'clientConnections';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-connections/client-connections.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientConnections
});

