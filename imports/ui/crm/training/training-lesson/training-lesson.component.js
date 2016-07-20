/**
 * Created by Danpan on 23.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {lessons} from './training-lessons-array.js'

import './training-lesson.view.html';

class TrainingLesson {
  /* @ngInject */
  constructor($scope, $reactive, $http, $timeout, $state, $stateParams) {
    $reactive(this).attach($scope);
    let vm = this;
    this.$stateParams = $stateParams;

    this.lesson = lessons[this.$stateParams.number - 1];

    //jQuery('#youtubeVideo').attr('src',this.lesson.videoLink);
    //$('#youtubeVideo').attr('src',this.lesson.videoLink);

  }

  onTaskDoneChange (id) {
    console.log(this.lesson.task[id-1].done);
  }
  
}

const moduleName = 'trainingLesson';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/training/training-lesson/training-lesson.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: TrainingLesson
})/*.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '*://www.youtube.com/**'
    ]);
  })*/;
  
