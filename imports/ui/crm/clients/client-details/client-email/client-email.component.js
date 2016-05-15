/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Email} from 'meteor/email';
import {Meteor} from 'meteor/meteor';

import './client-email.view.html';

class ClientEmail {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
  }

  send() {
    console.log('sendTest em');
    Meteor.call('sendTest');
  }
}

const moduleName = 'clientEmail';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-email/client-email.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientEmail
});

