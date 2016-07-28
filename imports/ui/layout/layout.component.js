/**
 * Created by Danpan on 22.04.16.
 */
import angular from 'angular';
import {Meteor} from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import {Accounts} from 'meteor/accounts-base';

import './layout.view.html';
import './set-city.view.html';

import {RobokassaReplenishController} from '/imports/ui/shared/replenish-balance/robokassa-replenish.controller';
class Layout {
  /* @ngInject */
  constructor($scope, $reactive, $mdSidenav, $window, $mdDialog, $state) {

    $reactive(this).attach($scope);
    let vm = this;
    this.$window = $window;
    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    this.mdDialog = $mdDialog;
    this.select = 1;
    this.selectCallCenter = 1;
    this.selectAddRole = 1;
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        console.log(user, 'user');
        this.user = user;
        // debugger
        this.sideNavItems = [
          {name: 'Колл-центр', uisref: 'call-center.outgoing', visible: user.roles && user.roles.indexOf("staff") > -1},
          {name: 'Добавить ученика', uisref: 'crm.add-role', visible: user.roles && user.roles.indexOf("staff") > -1},
          {name: 'Океан объектов', uisref: 'crm.realty-new-list({operation: \'rent\', page: 1})', visible: true},
          {name: 'Подписка', uisref: 'crm.subscribe', visible: true},
          {name: 'Мои объекты', uisref: 'crm.realty.list.my', visible: true},
          {name: 'Мои клиенты', uisref: 'crm.clients.list.my' + '({status: \'realtor\'})', visible: true},
          {name: 'Документы', uisref: 'crm.documents', visible: !user.roles || user.roles.indexOf("staff") < 0},
          {name: 'Помощь', href: 'https://vk.com/write3296627', visible: !user.roles || user.roles.indexOf("staff") < 0},
          {
            name: '150 за 6',
            uisref: 'crm.training.list',
            visible: (user.roles && user.roles.indexOf('couching') !== -1)
          },
          {
            name: '150 за 6',
            href: 'http://murigin.ru/intensiv/',
            visible: !(user.roles && user.roles.indexOf('couching') !== -1)
          }
        ];

        if (!user.profile.city) {

          class selectCity {

            constructor() {
              this.city = 'Москва';
            }

            setCity(city) {
              console.log(' ===== setCity START', city);
              Meteor.call('setCity', vm.user._id, city, (err, result) => {
                if (err) {
                  console.log('=== setCity ERR', err);
                } else {
                  console.log('=== setCity RESULT', result);
                }
                vm.mdDialog.cancel();
              });
            }

            close() {
              vm.mdDialog.cancel();
            }
          }

          this.mdDialog.show({
            controller: selectCity,
            controllerAs: 'selectCity',
            templateUrl: 'imports/ui/layout/set-city.view.html',
            preserveScope: true,
            //targetEvent: ev,
            clickOutsideToClose: true
          });
        }

      }
    });

  }

  goToPage(url) {
    this.toggleList();
    console.log(url);
    window.open(url);
  }

  selectText() {
    this.select = 1;
    return 'Добавить';
  }

  // onSelectCallCenter() {
  //   this.selectCallCenter = 1;
  //   return 'Колл-центр';
  // }

  // onSelectAddRole() {
  //   this.selectAddRole = 1;
  //   return 'Добавить роль';
  // }

  toggleList() {
    this.$mdSidenav('right').toggle();
  }

  logout() {
    Accounts.logout();
  }

  replenishTheBalance(ev) {

    this.mdDialog.show({
      controller: RobokassaReplenishController,
      controllerAs: 'robokassaDialog',
      //onsubmit="return __cmsformcheck_order()"
      templateUrl: 'imports/ui/shared/replenish-balance/replenish-balance.view.html',
      preserveScope: true,
      targetEvent: ev,
      clickOutsideToClose: true
    });
  }
}

const moduleName = 'layout';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/layout/layout.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Layout
})
  .config(mdThemeConfig)
  .config(mdIconConfig);

const URL_ICON_MENU = 'svg/menu.svg';
function mdIconConfig($mdIconProvider) {
  'ngInject';
  $mdIconProvider
    .icon('menu', URL_ICON_MENU, 24)
    .icon('skip_next', 'svg/skip_next.svg', 48)
    .icon('skip_prev', 'svg/skip_previous.svg', 48)
    .icon('conditions_animal', 'svg/animal.svg', 24)
    .icon('conditions_balcony', 'svg/balcony.svg', 24)
    .icon('conditions_bathroom', 'svg/bathroom.svg', 24)
    .icon('conditions_children', 'svg/children.svg', 24)
    .icon('conditions_conditioner', 'svg/conditioner.svg', 24)
    .icon('conditions_dishWasher', 'svg/dishWasher.svg', 24)
    .icon('conditions_elevator', 'svg/elevator.svg', 28)
    .icon('conditions_furniture', 'svg/furniture.svg', 24)
    .icon('conditions_kitchen_furniture', 'svg/kitchen_furniture.svg', 24)
    .icon('conditions_phone', 'svg/phone.svg', 24)
    .icon('conditions_refrigerator', 'svg/refrigerator.svg', 24)
    .icon('conditions_shower', 'svg/shower.svg', 24)
    .icon('conditions_tv', 'svg/tv.svg', 24)
    .icon('conditions_washer', 'svg/washer.svg', 24)
    .icon('conditions_wifi', 'svg/wifi.svg', 24);

  /*  
   $mdIconProvider
   .icon('cond_desktop', 'svg/cond_desktop.svg', 24)
   .icon('cond_event_seat', 'svg/cond_event_seat.svg', 24)
   .icon('cond_kitchen', 'svg/cond_kitchen.svg', 24)
   .icon('cond_laundry', 'svg/cond_laundry.svg', 24)
   .icon('cond_pets', 'svg/cond_pets.svg', 24)
   .icon('cond_restaurant', 'svg/cond_restaurant.svg', 24)
   .icon('cond_wifi', 'svg/cond_wifi.svg', 24);*/


  /*const planetPackageBower = '/packages/planettraining_material-design-icons/bower_components/';

   const iconPath = planetPackageBower + 'material-design-icons/sprites/svg-sprite/';

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
   iconPath + 'svg-sprite-image.svg');*/
}

function mdThemeConfig($mdThemingProvider) {
  'ngInject';
  $mdThemingProvider.theme('default')
    .primaryPalette('blue');
}
