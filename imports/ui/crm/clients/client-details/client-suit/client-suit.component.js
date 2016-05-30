/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Realty} from '/imports/api/realty';
import {Clients} from '/imports/api/clients';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {dictionary} from '/imports/helpers/dictionary';

import './client-suit.view.html';

class ClientSuit {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
    var vm = this;
    vm.assort = $stateParams.assort ? $stateParams.assort : 'exact' ;
    vm.selectedTab = '';
    switch($stateParams.assort){
        case 'my':
            vm.selectedTab = 0;
            break;
        case 'exact':
            vm.selectedTab = 1;
            break;
        case 'auto':
            vm.selectedTab = 2;
            break;
        default:
            vm.selectedTab = 1;
    } 
  }
}

const moduleName = 'clientSuit';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-suit/client-suit.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientSuit
});

