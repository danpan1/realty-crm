import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import * as helpers from './subscribe-rent.array.js'

import './subscribe-rent.view.html';

class SubscribeRent {
  /* @ngInject */
  constructor($scope, $reactive, $mdDialog, $timeout, $state, $stateParams) {
    $reactive(this).attach($scope);
    let vm = this;

    this.segments = helpers.segments;
    this.monthSegments = helpers.monthSegments;

  }

  onCountCost () {
    let price = 0;
    for (let segment of this.segments) {
      price += segment.price * segment.qty;
    }
    for (let segment of this.monthSegments) {
      if (segment.subscribed) price += segment.price;
    }
    this.fullCost = price;
    console.log(this.fullCost);
  }

}

const moduleName = 'subscribeRent';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/subscribe/subscribe-rent/subscribe-rent.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: SubscribeRent
});
  
