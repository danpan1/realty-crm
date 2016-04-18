/**
 * Created by Danpan on 16.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import uiRouter from 'angular-ui-router';
import './crm.view.html';
import {name as myList} from '../myList/myList.component';
import {name as Navigation} from '../navigation/navigation.component';
import ngMaterial from 'angular-material';

class Crm {
}

const name = 'crm';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  Navigation,
  ngMaterial,
  myList,
  'accounts.ui'
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.view.html`,
  controllerAs: name,
  controller: Crm
}).config(config)
  .run(run);

function config($locationProvider, $urlRouterProvider,$mdIconProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/my/list');

  const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

  $mdIconProvider
    .iconSet('social',
      iconPath + 'svg-sprite-social.svg')
    .iconSet('action',
      iconPath + 'svg-sprite-action.svg')
    .iconSet('communication',
      iconPath + 'svg-sprite-communication.svg')
    .iconSet('content',
      iconPath + 'svg-sprite-content.svg')
    .iconSet('toggle',
      iconPath + 'svg-sprite-toggle.svg')
    .iconSet('navigation',
      iconPath + 'svg-sprite-navigation.svg')
    .iconSet('image',
      iconPath + 'svg-sprite-image.svg');
}

function run($rootScope, $state) {
  'ngInject';

  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if(error === 'AUTH_REQUIRED') {
        $state.go('parties');
      }
    }
  );
}