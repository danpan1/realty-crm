/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Realty} from '/imports/api/realty';

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
    
    this.subscribe('oneInfo',() => {
        return [{type:3}]
    });

    this.helpers({
      objects: () => {
        return Realty.findOne({});
      }
    });
    
  }
}

const moduleName = 'clientRelations';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-relations/client-relations.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientRelations
});

