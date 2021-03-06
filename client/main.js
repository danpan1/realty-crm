import angular from 'angular';

import {Meteor} from 'meteor/meteor';

import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import {name as CRM} from '/imports/ui/crm/crm.module';
import {name as CallCenter}from '/imports/ui/call-center/call-center.component';
import {name as auth}from '/imports/ui/auth/auth.module';

angular
  .module('app', ['app.custom', CRM, CallCenter, auth]).config(config).run(run);

angular
  .module('app.custom', [uiRouter, 'ngFileUpload', 'ngSanitize', ngMaterial, 'accounts.ui', 'angular-md5']);

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
  $urlRouterProvider.otherwise('/realty/list/my');
}

function run($rootScope, $state) {
  'ngInject';
  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if (error === 'AUTH_REQUIRED') {
        $state.go('auth.login');
        //система.миринедвижимость.рф
        // window.location = 'http://xn--80ajirwbh.xn--b1adcggadb2aietqyp4n.xn--p1ai/';
      }
    }
  );

  $rootScope.$on('$stateChangeStart', function (event, toState, fromParams) {

    if (Meteor.userId() == null && toState.name !== 'auth.login' && toState.name !== 'auth.register' && toState.name !== 'auth.resetpw' && toState.name !== 'crm.feedback' && toState.name !== 'auth.register-photo') {
      console.log(toState.name);
      event.preventDefault();
      console.log("Please login");
      $state.go('auth.login');
      //система.миринедвижимость.рф
      // window.location = 'http://xn--80ajirwbh.xn--b1adcggadb2aietqyp4n.xn--p1ai/';
    }
  });
}
