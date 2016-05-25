/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import {name as ClientCard} from '/imports/ui/shared/client-card/client-card.component';
import {name as PaginationButtons} from '/imports/ui/shared/pagination-buttons/pagination-buttons.component';
import {Counts} from 'meteor/tmeasday:publish-counts';
import './list-my-clients.view.html';
import {Clients} from '/imports/api/clients';

class ListMyClients {
  /* @ngInject */
  constructor($scope, $reactive, $state, $stateParams) {
    $reactive(this).attach($scope);
    this.state = $state;
    this.stateParams = $stateParams;

    let vm = this;
    vm.status = this.stateParams.status ? this.stateParams.status : 'hot';
    vm.loaded = false;
    vm.perPage = 1;
    vm.page = this.stateParams.page ? parseInt(this.stateParams.page) : 1;
    vm.sort = {
      'createdAt': -1
    };

    vm.selectedTab = '';
    switch ($stateParams.status) {
      /*case 'hot':
        vm.selectedTab = 0;
        break;*/
      case 'realtor':
        vm.selectedTab = 0;
        break;
      case 'archive':
        vm.selectedTab = 1;
        break;
      default:
        vm.selectedTab = 0;
        break;
    }
    vm.subscribe('listClients', () => {
      return [{
        status: vm.getReactively('status')
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
        console.log('onReady And the Items actually Arrive', arguments);
        // subscriptionHandle.stop();  // Stopping the subscription, will cause onStop to fire
      }
    });
    vm.helpers({
      clients() {
        return Clients.find({}, {sort: vm.getReactively('sort')});
      },
      clientsCount: () => {
        return Counts.get('clientsCount');
      },
      pagesCount: () => {
        return Math.ceil(Counts.get('clientsCount') / this.perPage);
      }
    });

  }

  goToPage(newPageNumber) {
    this.state.go('crm.clients.list.my', {status: this.status, page: newPageNumber});
  }

}

const moduleName = 'listMyClients';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  ClientCard,
  uiRouter,
  utilsPagination,
  PaginationButtons
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/list-my-clients/list-my-clients.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ListMyClients
});

