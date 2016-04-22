/**
 * Created by Danpan on 22.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './layout.view.html';

class Layout {
  constructor($mdSidenav) {
    'ngInject';
    this.$mdSidenav = $mdSidenav;
    this.sideNavItems = [
      {name:'Объекты', uisref:'realty'},
      {name:'Клиенты', uisref:'realty'},
      {name:'Дела', uisref:'realty'},
      {name:'Отчет', uisref:'realty'},
      {name:'Собщения', uisref:'realty'},
      {name:'Документы', uisref:'realty'},
      {name:'Настройки', uisref:'realty'},
      {name:'Входящие', uisref:'realty'},
      {name:'Исходящие', uisref:'realty'},
      {name:'Модератор', uisref:'realty'}
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
  });