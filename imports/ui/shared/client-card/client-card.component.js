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
    this.user = Meteor.user();
    /*this.isCommonClient = this.client.status == 'active' ? true : true;
     this.isHotClient = this.client.status == 'hot' ? true : false;
     this.isArchiveClient = this.client.status == 'archive' ? true : false;*/
    this.searchDuration = parseInt((new Date().getTime() - this.client.searchStartDate.getTime()) / 86400000);
    this.searchTarget = false;
    if (this.client.searchEndDate) {
      this.searchTarget = parseInt((this.client.searchEndDate.getTime() - new Date().getTime()) / 86400000) > 0;
    }
  }

  changeRelationTypeInRealty(type, realtyId, clientId, isNew) {
    Meteor.call('changeRelationTypeInRealty', type, realtyId, clientId, isNew);
  }
  
  sendCurrentClient(client) {
    console.log(client);
    /*ClientCard.$scope.$emit('sendingCurrentClient', client);*/
  }

  sendRealtyRelation(clientId) {
    this.preloader = true;
    console.log(clientId, 'clientId');
    console.log(this.realtyId, 'realtyId');
    Meteor.call('setRelationFindClient', clientId, this.realtyId, this.pageFrom, (error, result) => {
      if (err) {
          this.preloader = false;
        } else {
          this.timeout(()=> {
            this.preloader = false;
          }, 0);
        }
    });
    /*ClientCard.$scope.$emit('sendingCurrentClient', client);*/
  }
  
  moveToTab (num) {
    this.activeTab = num;
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
    relationType: '@',
    realtyId: '<',
    activeTab: '=',
    preloader: '='
  },
  controllerAs: moduleName,
  controller: ClientCard
});

