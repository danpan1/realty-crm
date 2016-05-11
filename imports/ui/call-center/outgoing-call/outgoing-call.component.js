/**
 * Created by  Danpan on 25.04.16.
 */
import angular from 'angular';
import {Meteor} from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import {name as realtyConditions} from '../../shared/realty-conditions/realty-conditions.component';
import {name as subwayChips} from '/imports/ui/shared/subway-chips/subway-chips.component';
import {name as realtyStreet} from '/imports/ui/shared/realty-street/realty-street.component';
import {name as districtSingle} from '/imports/ui/shared/district-single/district-single.component';
import {dictionary} from '/imports/api/dictionary';
import {Realty} from '/imports/api/realty';
import './outgoing-call.view.html';

class OutgoingCall {
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    this.dictionary = dictionary;
    const vm = this;

    // vm.subscribe('outgoingCall', () => {
    //   return [];
    // }, {
    //   onReady: function () {
    //     vm.loaded = true;
    //     let t = Realty.findOne({});
    //     if (t) {
    //       vm.subways22 = t.address.subways;
    //     }
    //   }
    // });
    //
    // vm.helpers({
    //   realty: () => {
    //     let t = Realty.findOne({});
    //     // vm.subways22 = t.address.subways;
    //     return t;
    //   }
    // });
    // this.$localStorage = $localStorage;
    this.getNew();

  }

  getNew() {
    this.isLoading = true;
    const vm = this;
    Meteor.call('operatorGet', (error, result)=> {
      // vm.realty.address.subways = ['FRmpz68NzBxzoPQJ7'];

      if (error) {
        console.log('error', error);
      }

      this.$timeout(()=> {
        vm.realty = result;
        // vm.realty.address.subways = result.address.subways;
        // vm.subways22 = result.address.subways.slice();
        // vm.realty.address.districtIdForm = vm.realty.address.districtId;
        vm.isLoading = false;
        vm.operator = {};
        console.log('новый объект', vm.realty);
        // vm.realty.details.conditions = ["kitchen_furniture","tv"];
        if (!result) {
          vm.isLoading = true;
        }
      });
      // this.realty.address.subways = ['FRmpz68NzBxzoPQJ7'];

    });

  }

}

const moduleName = 'outgoingCall';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  realtyConditions,
  realtyStreet,
  districtSingle,
  subwayChips
]).component(moduleName, {
  templateUrl: 'imports/ui/call-center/outgoing-call/outgoing-call.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: OutgoingCall
});
