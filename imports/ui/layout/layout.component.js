/**
 * Created by Danpan on 22.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './layout.view.html';

class Layout {
  /* @ngInject */
  constructor($mdSidenav) {
    this.$mdSidenav = $mdSidenav;
    this.sideNavItems = [
      {name: 'Объекты', uisref: 'crm.realty.new'},
      {name: 'Клиенты', uisref: 'crm.clients'},
      // {name:'Дела', uisref:'realty'},
      // {name:'Отчет', uisref:'realty'},
      // {name:'Собщения', uisref:'realty'},
      // {name:'Документы', uisref:'realty'},
      // {name:'Настройки', uisref:'realty'},
      {name: 'Входящие Колл-центр', uisref: 'call-center.incoming'},
      {name: 'Исходящие Колл-центр', uisref: 'call-center.outgoing'}
      // {name:'Модератор', uisref:'realty'}
    ];
  }

  toggleList() {
    this.$mdSidenav('left').toggle();
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
}).config(config);

const URL_ICON_MENU = 'svg/menu.svg';
function config($mdIconProvider) {
  'ngInject';
  $mdIconProvider
    .icon('menu', URL_ICON_MENU, 24);
  
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
