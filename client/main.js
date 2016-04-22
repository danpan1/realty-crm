import angular from 'angular';

import { Meteor } from 'meteor/meteor';

import { name as App } from '/imports/ui/app';
angular
  .module('sidenavDemo1', ['ngMaterial']);
function onReady() {
  angular.bootstrap(document, [
    App
  ], {
    strictDi: true
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}