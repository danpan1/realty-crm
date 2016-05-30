/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Realty} from '/imports/api/realty';
import {Clients} from '/imports/api/clients';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {dictionary} from '/imports/helpers/dictionary';

import './client-analytics.view.html';

class ClientAnalytics {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
    var vm = this;
    this.client = Clients.findOne({_id: $stateParams.client});
    this.dictionary = dictionary;

    vm.helpers({
      client: () => {
        return Clients.findOne({_id: $stateParams.client});
      }
    });
  }
}

const moduleName = 'clientAnalytics';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-analytics/client-analytics.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientAnalytics
});

