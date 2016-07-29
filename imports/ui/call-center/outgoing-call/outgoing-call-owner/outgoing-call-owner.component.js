/**
 * Created by  Danpan on 25.04.16.
 */
import angular from 'angular';
import {Meteor} from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import {dictionary} from '/imports/helpers/dictionary';
import './outgoing-call-owner.view.html';

class OutgoingCallOwner {
  /* @ngInject */
  constructor($scope, $reactive, $timeout, $state) {
    $reactive(this).attach($scope);
    let vm = this;
    this.$timeout = $timeout;
    this.dictionary = dictionary;
    this.currentConditions = [];

    function setConditions () {
      if (vm.realty) {
        console.log('setConditions')
        if (vm.realty.details && vm.realty.details.conditions) {
          console.log(vm.realty.details.conditions);
          console.log('vm.realty.details'.toUpperCase(), vm.realty.details);
          for (var i in dictionary.conditions) {
            vm.currentConditions[i] = {};
          }
          if (vm.realty.details.conditions) {
            vm.setActiveConditions(vm.realty.details.conditions);
          }
        }
      } else {
        vm.$timeout(() => {
          setConditions();
        }, 100);
      }
    }
    setConditions();

    
    this.$onChanges = function () {
      console.log('outgoing-call-owner. $onChanges')
      this.currentConditions = [];
      setConditions();
    }



  }
  
  onConditionsChange(condition) {
    let index;
    if (this.realty.details.conditions) {
      index = this.realty.details.conditions.indexOf(condition);
    }
    else {
      this.realty.details.conditions = [];
      index = -1;
    }
    if (index === -1) this.realty.details.conditions.push(condition);
    else this.realty.details.conditions.splice(index, 1);
    console.log(this.realty.details.conditions);
  }

  setActiveConditions(conditions) {
    console.log(conditions);
    for (var i in conditions) {
      for (var n in dictionary.conditions) {
        this.currentConditions[n].name = dictionary.conditions[n].id;
        if (conditions[i] == dictionary.conditions[n].id) {
          this.currentConditions[n].presence = true;
          console.log(this.currentConditions[n]);
        }
      }
    }
  }


}

const moduleName = 'outgoingCallOwner';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/call-center/outgoing-call/outgoing-call-owner/outgoing-call-owner.view.html',
  bindings: {
    realty: '=',
    showLoader: '<'
  },
  controllerAs: moduleName,
  controller: OutgoingCallOwner
})