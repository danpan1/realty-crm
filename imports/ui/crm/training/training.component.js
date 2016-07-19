/**
 * Created by Danpan on 23.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {name as TrainingLesson} from './training-lesson/training-lesson.component'
import {name as TrainingList} from './training-list/training-list.component'

import './training.view.html';

class Training {
  /* @ngInject */
  constructor($scope, $reactive, $http, $timeout) {
    $reactive(this).attach($scope);
    let vm = this;

  }
}

const moduleName = 'training';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  TrainingLesson,
  TrainingList
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/training/training.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Training
})
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('crm.training', {
      url: '/training',
      template: '<training/>'
    })
    .state('crm.training.list', {
      url: '/list',
      template: '<training-list/>'
    })
    .state('crm.training.lesson', {
      url: '/lesson?:number',
      template: '<training-lesson/>',
      controller: function ($state, $stateParams) {}
    });
}
