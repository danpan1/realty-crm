/**
 * Created by  Danpan on 25.04.16.
 */
import angular from 'angular';
import {Meteor} from 'meteor/meteor';
import angularMeteor from 'angular-meteor';

import {name as subwayChips} from '/imports/ui/shared/subway-chips/subway-chips.component';

import './outgoing-call.view.html';

class OutgoingCall {
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    // this.$localStorage = $localStorage;
    this.getNew();
    this.newt = 123123123;

  }

  getNew() {
    this.isLoading = true;
    const vm = this;
    Meteor.call('operatorGet', (error, result)=> {
      if (error) {
        console.log('error', error);
      }

      this.$timeout(()=> {
        vm.realty = result;
        vm.isLoading = false;
        vm.operator = {};
        console.log('новый объект', vm.realty);
        if (!result) {
          vm.isLoading = true;
        }
      });
      
    });
  }
}

const moduleName = 'outgoingCall';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  subwayChips
]).component(moduleName, {
  templateUrl: 'imports/ui/call-center/outgoing-call/outgoing-call.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: OutgoingCall
});
