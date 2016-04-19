/**
 * Created by Danpan on 16.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import uiRouter from 'angular-ui-router';
import './crm.view.html';
import {name as myList} from '../myList/myList.component';
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
          name: 'Lia Lugo',
          avatar: 'svg-1',
          content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
        },
        {
          name: 'George Duke',
          avatar: 'svg-2',
          content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
        },
        {
          name: 'Gener Delosreyes',
          avatar: 'svg-3',
          content: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS."
        },
        {
          name: 'Lawrence Ray',
          avatar: 'svg-4',
          content: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.'
        },
        {
          name: 'Ernesto Urbina',
          avatar: 'svg-5',
          content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
        },
        {
          name: 'Gani Ferrer',
          avatar: 'svg-6',
          content: "Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new driver's license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You don't go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada."
        }
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