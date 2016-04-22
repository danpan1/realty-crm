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