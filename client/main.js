import angular from 'angular';

import { Meteor } from 'meteor/meteor';

import { name as Crm } from '../imports/ui/components/crm/crm.component';
angular
  .module('sidenavDemo1', ['ngMaterial']);
function onReady() {
  angular.bootstrap(document, [
    Crm
  ], {
    strictDi: true
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}