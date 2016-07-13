/**
 * Created by Danpan on 22.04.16.
 */
import angular from 'angular';
import {Meteor} from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import {Accounts} from 'meteor/accounts-base';

import './layout.view.html';

class Layout {
  /* @ngInject */
  constructor($scope, $reactive, $mdSidenav, $window) {

    $reactive(this).attach($scope);
    this.$window = $window;
    this.$mdSidenav = $mdSidenav;
    this.sideNavItems = [
      // {name: 'Добавить клиента', uisref: 'crm.clients.add'},
      // {name: 'Объекты', uisref: 'crm.realty.list.new'},
      {name: 'Океан объектов', uisref: 'crm.realty-new-list({operation: \'rent\', page: 1})'},
      {name: 'Мои объекты', uisref: 'crm.realty.list.my'},
      // {name: 'Новые объекты', uisref: 'crm.realty.list.new'},
      // {name: 'Архив объекты', uisref: 'crm.realty.list.my'+'({status: \'archive\'})'},
      {name: 'Мои клиенты', uisref: 'crm.clients.list.my' + '({status: \'realtor\'})'},
      // {name: 'Горячие Клиенты', uisref: 'crm.clients.list.my'+'({status: \'hot\'})'},
      // {name: 'Дела', uisref:'realty'},
      // {name: 'Отчет', uisref:'realty'},
      // {name: 'Сообщения', uisref:'realty'},
      {name: 'Документы', uisref: 'crm.documents'},
      {name: 'Видео-инструкции', ngClick: 'layout.videoTutorial = !layout.videoTutorial'},
      //{name:'Помощь', href:'https://vk.com/write19844032'},
      {name: 'Помощь', href: 'https://vk.com/write19844032'},
      {name: '150 за 6', href: 'http://murigin.ru/intensiv/'},
      //{name: 'О сервисе', uisref: 'crm.feedback'},
      // {name: 'Настройки', uisref:'realty'},
      // {name: 'Входящие Колл-центр', uisref: 'call-center.incoming'},
      // {name: 'Исходящие Колл-центр', uisref: 'call-center.outgoing'},
      // {name: 'Модератор', uisref: 'call-center.moderator'}
      // {name: 'Задать вопрос', uisref:'crm.feedback'},
    ];
    this.select = 1;
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        console.log(user, 'user');
        this.user = user;
      }
    });
  }

  goToPage (url) {
    console.log(url);
    window.open(url);
  }

  selectText() {
    this.select = 1;
    return 'Добавить';
  }

  toggleList() {
    this.$mdSidenav('right').toggle();
  }

  logout() {
    Accounts.logout();
  }

  replenishTheBalance(summ) {

    console.log('replenishTheBalance');
    let description = 'Пополнение баланса CRM Мир и Недвижимость на ' + summ;
    Meteor.call('replenishTheBalance', summ, description, (err, res)=> {
      console.log(err);
      this.$window.open(res, '_self');
      console.log(res);
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
