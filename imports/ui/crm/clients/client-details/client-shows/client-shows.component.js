/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Realty} from '/imports/api/realty';

import './client-shows.view.html';

class ClientShows {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
    
    console.log($stateParams);
    
    this.subscribe('oneInfo',() => {
         return [{type:4}]
    });

    this.helpers({
      objects: () => {
        return Realty.findOne({});
      }
    });
    
  }
}

const moduleName = 'clientShows';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-shows/client-shows.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientShows
});

