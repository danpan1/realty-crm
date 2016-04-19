import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import './messages.view.html';

class Messages {
  constructor() {

  }
}

const name = 'messages';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.view.html`,
    controllerAs: name,
    controller: Messages
  })
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('messages', {
      url: '/messages',
      template: '<messages/>'
    });
}