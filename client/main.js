import angular from 'angular';

import {Meteor} from 'meteor/meteor';

import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import {name as CRM} from '/imports/ui/crm/crm.module';
import {name as CallCenter}from '/imports/ui/call-center/call-center.component';
import {name as layout}from '/imports/ui/layout/layout.component';

angular
  .module('app', ['app.custom', CRM, CallCenter, layout]).config(config).run(run);

angular
  .module('app.custom', [uiRouter, ngMaterial, 'accounts.ui']);

function onReady() {
  angular.bootstrap(document, [
    'app'
  ], {
    strictDi: true
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}

function config($locationProvider, $urlRouterProvider) {
  'ngInject';
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/realty/new');
}

function run($rootScope, $state) {
  'ngInject';
  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if(error === 'AUTH_REQUIRED') {
        $state.go('login');
      }
    }
  );
}
