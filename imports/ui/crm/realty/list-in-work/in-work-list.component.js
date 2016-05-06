/**
 * Created by Danpan on 29.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {Realty} from '/imports/api/realty';
import {Counts} from 'meteor/tmeasday:publish-counts';
import './in-work-list.view.html';

class InWorkList {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);

    const vm = this;

    $reactive(this).attach($scope);

    vm.loaded = false;
    vm.perPage = 20;
    vm.page = 1;
    vm.sort = {
      'price': -1
    };

    vm.subscribe('inWorkList', () => {
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
          {status: {$in: ['sale']}},
          // {status: {$in: ['sale', 'taken', 'review', 'reviewed']}},
          {sort: vm.sort});
      },
      realtyCount: () => {
        return Counts.get('realtyCount');
      }
    });

    vm.pageChanged = (newPageNumber) => {
      vm.page = newPageNumber;
    };

  }

}

const moduleName = 'inWorkList';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/list-in-work/in-work-list.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: InWorkList
});
