/**
 * Created by Danpan on 26.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Realty} from '/imports/api/realty';

import './realty-one-layout.view.html';

class RealtyOneLayout {
  /* @ngInject */
  constructor($scope, $reactive, $state, $stateParams) {

    $reactive(this).attach($scope);

    this.subscribe('oneInfo', () => {
      return [
        $stateParams.realtyId
      ];
    }, {
      onReady(){
        // let realty = Realty.findOne({});
        // if (realty && realty.details && realty.details.conditions) {
        //   this.setActiveConditions(realty.details.conditions);
        // }
      }
    });

    this.helpers({
      infoRealty: () => {
        return Realty.findOne({});
      }
    });
    switch ($state.current.url) {
      // case '/demonstrations':
      //   this.selectedTab = 0;
      //   break;
      case '/find':
        this.selectedTab = 0;
        break;
      case '/connections':
        this.selectedTab = 1;
        break;
      case '/review':
        this.selectedTab = 2;
        break;
      case '/email':
        this.selectedTab = 3;
        break;
      case '/info':
        this.selectedTab = 4;
        break;
      default:
        this.selectedTab = 0;
    }
  }

}

const moduleName = 'realtyOneLayout';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/realty-one-layout/realty-one-layout.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: RealtyOneLayout
});
