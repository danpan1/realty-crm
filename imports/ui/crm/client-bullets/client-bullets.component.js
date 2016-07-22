import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as ClientBulletsList} from './client-bullets-list/client-bullets-list.component';
import {name as ClientBulletsChange} from './client-bullets-change/client-bullets-change.component';
import routes from './client-bullets.routes.js';
import './client-bullets.view.html';

class ClientBullets {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    const vm = this;
    this.loaded = true;
  }

}

const moduleName = 'clientBullets';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  ClientBulletsList,
  ClientBulletsChange
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/client-bullets/client-bullets.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientBullets
}).config(routes);
