/**
 * Created by Danpan on 29.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import {Realty} from '/imports/api/realty';
import {Counts} from 'meteor/tmeasday:publish-counts';
import './list-my.view.html';

class ListMy {
  /* @ngInject */
  constructor($scope, $reactive, $state, $stateParams) {
    $reactive(this).attach($scope);
    const vm = this;
    
    this.state = $state;
    this.stateParams = $stateParams;
    
    vm.loaded = false;
    vm.perPage = 2;
    vm.page = this.stateParams.page ? parseInt(this.stateParams.page) : 1;
    vm.sort = {
      'price': -1
    };

    vm.subscribe('listMy', () => {
      console.log(vm.getReactively('page'));
      return [
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
      realty: () => {
        return Realty.find(
          // {status: {$in: ['sale']}},
          {status: {$in: ['sale', 'taken', 'review', 'reviewed']}},
          {sort: vm.sort});
      },
      realtyCount: () => {
        return Counts.get('realtyCount');
      },
      pagesCount: () => {
        return Math.ceil(Counts.get('realtyCount') / this.perPage);
      }
    });
    
    vm.pageChanged = (newPageNumber) => {
      //vm.page = newPageNumber;
      this.state.go('crm.realty.list.my', {page: newPageNumber}) ;
    };

  }
  
  goToPage (newPageNumber) {
      this.state.go('crm.realty.list.my', {page: newPageNumber}) ;
  }

}

const moduleName = 'listMy';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  uiRouter,
  utilsPagination
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/list-my/list-my.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ListMy
});
