/**
 * Created by  Danpan on 25.04.16.
 */
import angular from 'angular';
import {Meteor} from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import {name as realtyConditions} from '../../shared/realty-conditions/realty-conditions.component';
import {name as subwayChips} from '/imports/ui/shared/subway-chips/subway-chips.component';
import {name as realtyStreet} from '/imports/ui/shared/realty-street/realty-street.component';
import {dictionary} from '/imports/api/dictionary';

import './outgoing-call.view.html';

class OutgoingCall {
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    this.dictionary = dictionary;
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
        // vm.realty.details.conditions = ["kitchen_furniture","tv"];
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
  realtyConditions,
  realtyStreet,
  subwayChips
]).component(moduleName, {
  templateUrl: 'imports/ui/call-center/outgoing-call/outgoing-call.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: OutgoingCall
});
