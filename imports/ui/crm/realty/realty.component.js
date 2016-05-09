import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as NewList} from './list-new/new-list.component';
import {name as ArchiveList} from './list-archive/list-archive';
import {name as listMy} from './list-my/list-my.component';
import {name as realtyListLayout} from './realty-list-layout/realty-list-layout.component';
import {name as realtyOneLayout} from './realty-one-layout/realty-one-layout.component';
import {name as oneDemonstrations} from './one-demonstrations/one-demonstrations.component';
import {name as oneConnections} from './one-connections/one-connections.component';
import {name as oneEmail} from './one-email/one-email.component';
import {name as oneReview} from './one-review/one-review.component';
import {name as oneInfo} from './one-info/one-info.component';
import routes from './realty.routes.js';
import './realty.view.html';
const moduleName = 'realty';

class Realty {
  /* @ngInject */
  // constructor($scope, $reactive) {
  //   $reactive(this).attach($scope);
  // }

}
// create a module
export default angular.module(moduleName, [
  angularMeteor,
  realtyOneLayout,
  oneDemonstrations,
  oneInfo,
  oneEmail,
  oneConnections,
  oneReview,
  realtyListLayout,
  ArchiveList,
  listMy,
  NewList
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/realty.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Realty
}).config(routes);
