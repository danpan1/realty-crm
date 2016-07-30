/**
 * Created by Danpan on 23.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {name as subscribeRent} from './subscribe-rent/subscribe-rent.component'
import {name as subscribeSell} from './subscribe-sell/subscribe-sell.component'

import './subscribe.view.html';

class Subscribe {
  /* @ngInject */
  constructor($scope, $reactive, $http, $timeout) {
    $reactive(this).attach($scope);
    let vm = this;
    this.disabled = true;

    switch (window.localStorage["subscribeActiveTab"]) {
      case 'rent': this.selectedTab = 0; break;
      case 'sell': this.selectedTab = 1; break;
      default: this.selectedTab = 0;
    }

  }

  setActiveTab (activeTab) {
    window.localStorage["subscribeActiveTab"] = activeTab;
  }

}

const moduleName = 'subscribe';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  subscribeRent,
  subscribeSell
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/subscribe/subscribe.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Subscribe
})
  // .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('crm.subscribe', {
      url: '/subscribe',
      template: '<subscribe/>'
    });
}
