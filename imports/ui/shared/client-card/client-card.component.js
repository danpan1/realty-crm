/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './client-card.view.html';

class ClientCard {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    /*this.isCommonClient = this.client.status == 'active' ? true : true;
     this.isHotClient = this.client.status == 'hot' ? true : false;
     this.isArchiveClient = this.client.status == 'archive' ? true : false;*/
    this.searchDuration = parseInt((new Date().getTime() - this.client.searchStartDate.getTime()) / 86400000);
    this.searchTarget = false;
    if (this.client.searchEndDate) {
      this.searchTarget = parseInt((this.client.searchEndDate.getTime() - new Date().getTime()) / 86400000) > 0;
    }
  }

  sendCurrentClient(client) {
    console.log(client);
    /*ClientCard.$scope.$emit('sendingCurrentClient', client);*/
  }

  sendRealtyRelation(clientId) {
    console.log(clientId, 'clientId');
    console.log(this.realtyId, 'realtyId');
    Meteor.call('setRelationFindClient', clientId, this.realtyId, this.pageFrom);
    /*ClientCard.$scope.$emit('sendingCurrentClient', client);*/
  }

}

const moduleName = 'clientCard';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/client-card/client-card.view.html',
  bindings: {
    client: '<',
    assort: '<',
    pageFrom: '@',
    realtyId: '@'
  },
  controllerAs: moduleName,
  controller: ClientCard
});

