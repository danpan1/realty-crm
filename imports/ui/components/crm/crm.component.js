/**
 * Created by Danpan on 16.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import uiRouter from 'angular-ui-router';
import './crm.view.html';
import {name as myList} from '../myList/myList.component';
import {name as messages} from '../messages/messages.component';
import {name as SubwayChips}from '/imports/ui/core/subwayChips/subwayChips.component.js';
import ngMaterial from 'angular-material';
/**
 * Main App Controller for the Angular Material Starter App
 * @param $scope
 * @param $mdSidenav
 * @param avatarsService
 * @constructor
 */
function Crm( $mdSidenav, $mdBottomSheet, $log ) {
  'ngInject';
  // $log = $log.getInstance( "SessionController" );
  // $log.debug( "instanceOf() ");

  var self = this;
  self.pickedMetroIds =  ["Tr7cMnxu8cr7BbzvE","ktYzMPsmw72Sej3cQ"];
  self.selected     = null;
  self.users        = [ ];
  self.selectUser   = selectUser;
  self.toggleList   = toggleUsersList;
  self.share        = share;

  // Load all registered users

  // usersService
    // .loadAll()
    // .then( function( users ) {
      self.users    = [
        {
          name: 'CRM',
          href : '/my/list'
        },
        {
          name: 'Сообщения',
          href : '/messages'
        },
        {
          name: 'Документы',
        },
        {
          name: 'Настройки',
        },
      ];
      self.selected = self.users[0];
    // });

  // *********************************
  // Internal methods
  // *********************************

  /**
   * Hide or Show the 'left' sideNav area
   */
  function toggleUsersList() {
    $log.debug( "toggleUsersList() ");
    $mdSidenav('left').toggle();
  }

  /**
   * Select the current avatars
   * @param menuId
   */
  function selectUser ( user ) {
    $log.debug( "selectUser( {name} ) ", user);

    self.selected = angular.isNumber(user) ? $scope.users[user] : user;
    self.toggleList();
  }

  /**
   * Show the bottom sheet
   */
  function share($event) {
    $log.debug( "contactUser()");

    var user = self.selected;

    $mdBottomSheet.show({
      parent: angular.element(document.getElementById('content')),
      templateUrl: '/src/users/view/contactSheet.html',
      controller: [ '$mdBottomSheet', '$log', UserSheetController],
      controllerAs: "vm",
      bindToController : true,
      targetEvent: $event
    }).then(function(clickedItem) {
      $log.debug( clickedItem.name + ' clicked!');
    });

    /**
     * Bottom Sheet controller for the Avatar Actions
     */
    function UserSheetController( $mdBottomSheet, $log ) {

      $log = $log.getInstance( "UserSheetController" );
      $log.debug( "instanceOf() ");

      this.user = user;
      this.items = [
        { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
        { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
        { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
        { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
      ];
      this.performAction = function(action) {
        $log.debug( "makeContactWith( {name} )", action);
        $mdBottomSheet.hide(action);
      };

    }
  }
}

// class Crm {
// }

const name = 'crm';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  SubwayChips,
  messages,
  ngMaterial,
  myList,
  'accounts.ui'
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.view.html`,
  controllerAs: name,
  controller: Crm
}).config(config)
  .run(run);
const URL_AVATAR_ICONS = 'svg/avatars.svg';
const URL_ICON_MENU    = 'svg/menu.svg';
const URL_ICON_SHARE   = 'svg/share.svg';
function config($locationProvider, $urlRouterProvider,$mdIconProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/my/list');

  const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

  $mdIconProvider
    .defaultIconSet( URL_AVATAR_ICONS, 128 )
    .icon('menu' ,URL_ICON_MENU, 24)
    .icon('share',URL_ICON_SHARE, 24);

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