/**
 * Created by Danpan on 24.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {Clients} from '/imports/api/clients';
import {Realty} from '/imports/api/realty';

import './one-find.view.html';

class OneFind {
  /* @ngInject */
  constructor($scope, $reactive, $state, $stateParams) {
    $reactive(this).attach($scope);
    this.state = $state;
    this.stateParams = $stateParams;

    let vm = this;
    vm.searchType = this.stateParams.searchType || 'my';
    vm.loaded = false;
    vm.perPage = 20;
    vm.page = this.stateParams.page ? parseInt(this.stateParams.page) : 1;
    vm.sort = {
      'createdAt': -1
    };

    switch ($stateParams.searchType) {
      case 'my':
        vm.selectedTab = 0;
        break;
      case 'manual':
        vm.selectedTab = 1;
        break;
      case 'algorithm':
        vm.selectedTab = 2;
        break;
      default:
        vm.selectedTab = 0;
        break;
    }
    vm.subscribe('findClients', () => {
      return [{
        conditions: vm.getReactively('realty.details.conditions'),
        metroTime: vm.getReactively('realty.address.metroTime'),
        metroTransport: vm.getReactively('realty.address.metroTransport'),
        price: vm.getReactively('realty.price'),
        roomcount: vm.getReactively('realty.roomcount'),
        searchType: vm.getReactively('stateParams.searchType'),
        status: vm.getReactively('status'),
        subways: vm.getReactively('realty.address.subways')
      },
        {
          limit: parseInt(vm.perPage),
          skip: parseInt((vm.getReactively('page') - 1) * vm.perPage),
          sort: vm.getReactively('sort')
        }

      ];
    }, {
      onReady: function () {
        vm.loaded = true;
        // console.log('onReady And the Items actually Arrive', arguments);
        // subscriptionHandle.stop();  // Stopping the subscription, will cause onStop to fire
      }
    });
    vm.helpers({
      clients() {
        // let clientIds = [];
        // let realty = Realty.findOne({});
        // if (realty && realty.relations) {
        //   clientIds = realty.relations.map((item)=> {
        //     return item.clientId;
        //   });
        // }
        return Clients.find(
          {
            // '_id': {
            //   $nin: clientIds
            // }
          }, {
            sort: vm.getReactively('sort')
          }
        );

      },
      clientsCount: () => {
        return Counts.get('clientsCount');
      },
      realty: () => {
        return Realty.findOne({});
      },
      pagesCount: () => {
        return Math.ceil(Counts.get('clientsCount') / this.perPage);
      }
    });

  }

}

const moduleName = 'oneFind';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/one-find/one-find.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: OneFind
});

