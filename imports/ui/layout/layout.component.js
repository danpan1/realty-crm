/**
 * Created by Danpan on 22.04.16.
 */
import angular from 'angular';
import {Meteor} from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import { Accounts } from 'meteor/accounts-base';

import './layout.view.html';

class Layout {
  /* @ngInject */
  constructor($scope, $reactive, $mdSidenav) {
    $reactive(this).attach($scope);
    this.$mdSidenav = $mdSidenav;
    this.sideNavItems = [
      {name: 'Объекты', uisref: 'crm.realty.list.new'},
      {name: 'Клиенты', uisref: 'crm.clients'},
      // {name:'Дела', uisref:'realty'},
      // {name:'Отчет', uisref:'realty'},
      // {name:'Собщения', uisref:'realty'},
      // {name:'Документы', uisref:'realty'},
      // {name:'Настройки', uisref:'realty'},
      // {name: 'Входящие Колл-центр', uisref: 'call-center.incoming'},
      {name: 'Исходящие Колл-центр', uisref: 'call-center.outgoing'}
      // {name:'Модератор', uisref:'realty'}
    ];
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        this.user = user;
      }
    });
  }

  toggleList() {
    this.$mdSidenav('left').toggle();
  }

  logout() {
    Accounts.logout();
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
    .icon('menu', URL_ICON_MENU, 24);
  const planetPackageBower = '/packages/planettraining_material-design-icons/bower_components/';

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
      iconPath + 'svg-sprite-image.svg');
}

function mdThemeConfig($mdThemingProvider) {
  'ngInject';
  $mdThemingProvider.theme('default')
    .primaryPalette('blue');
}
