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
    this.infoRealty = false;
    const vm = this;
    vm.loadedData = false;
    this.subscribe('oneInfo', () => {
      return [
        $stateParams.realtyId
      ];
    }, {
      onReady(){
        vm.loadedData = true;
        console.log('loadedData');
      }
    });

    this.helpers({
      infoRealty: () => {
        return Realty.findOne({_id: $stateParams.realtyId});
      }
    });
    console.log($state);
    switch ($state.current.name) {
      // case '/demonstrations':
      //   this.selectedTab = 0;
      //   break;
      case 'crm.realty.one.find':
        this.selectedTab = 2;
        break;
      case 'crm.realty.one.connections':
        this.selectedTab = 3;
        break;
      case 'crm.realty.one.review':
        this.selectedTab = 1;
        break;
      case 'crm.realty.one.email':
        this.selectedTab = 4;
        break;
      case 'crm.realty.one.info':
        this.selectedTab = 0;
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
