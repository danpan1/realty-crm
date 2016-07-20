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
    this.lessonNumber = this.$stateParams.number - 1;
    
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        if (!user.profile.lessons) {
          user.profile.lessons = [
            {num:1, done: false, available: false, tasks: [{id:1,done: false,comment: ''},{id:2,done: false,comment: ''}] },
            {num:2, done: false, available: false, tasks: [{id:1,done: false,comment: ''},{id:2,done: false,comment: ''}] },
            {num:3, done: false, available: false, tasks: [{id:1,done: false,comment: ''},{id:2,done: false,comment: ''}] },
            {num:4, done: false, available: false, tasks: [{id:1,done: false,comment: ''},{id:2,done: false,comment: ''}] },
            {num:5, done: false, available: false, tasks: [{id:1,done: false,comment: ''},{id:2,done: false,comment: ''}] },
            {num:6, done: false, available: false, tasks: [{id:1,done: false,comment: ''},{id:2,done: false,comment: ''}] }
          ]

          Meteor.call('setLessons', user.profile.lessons, (err, res) => {
            if (err) {
              console.log('==== setLessons ERROR', err);
            } else {
              console.log('==== setLessons RESULT', res);
            }
          })
        }

        this.user = user;
      }

    });

    this.lesson = lessons[this.$stateParams.number - 1];

  }

  onTaskDoneChange (id) {
    console.log(this.lesson.task[id-1].done);
  }

  changeTasks () {
    data = {
      lesson: this.$stateParams.number,
      tasks: this.user.profile.lessons[this.$stateParams.number - 1]
    }
    Meteor.call('saveComment', data, (err, res) => {
      if (err) {
        console.log('==== saveComment ERROR', err);
      } else {
        console.log('==== saveComment RESULT', res);
      }
    });
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
});
  
