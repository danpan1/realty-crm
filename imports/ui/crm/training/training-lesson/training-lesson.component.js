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
  constructor($scope, $reactive, $http, $mdDialog, $timeout, $state, $stateParams) {
    $reactive(this).attach($scope);
    let vm = this;
    this.$stateParams = $stateParams;
    this.mdDialog = $mdDialog;
    this.$state = $state;
    this.lessonNumber = this.$stateParams.number - 1;
    
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        if (!user.profile.couching.lessons) {
          this.noAccessShow();
          user.profile.couching.lessons = [
            {num:1, done: false, available: true, tasks: [{id:1,done: false,comment: ''},{id:2,done: false,comment: ''}] },
            {num:2, done: false, available: false, tasks: [{id:1,done: false,comment: ''},{id:2,done: false,comment: ''}] },
            {num:3, done: false, available: false, tasks: [{id:1,done: false,comment: ''},{id:2,done: false,comment: ''}] },
            {num:4, done: false, available: false, tasks: [{id:1,done: false,comment: ''},{id:2,done: false,comment: ''}] },
            {num:5, done: false, available: false, tasks: [{id:1,done: false,comment: ''},{id:2,done: false,comment: ''}] },
            {num:6, done: false, available: false, tasks: [{id:1,done: false,comment: ''},{id:2,done: false,comment: ''}] }
          ]

          Meteor.call('setLessons', user.profile.couching.lessons, (err, res) => {
            if (err) {
              console.log('==== setLessons ERROR', err);
            } else {
              console.log('==== setLessons RESULT', res);
            }
          })
        } else {
          if (user.profile.couching.lessons[this.lessonNumber].available != true) this.noAccessShow();
        }
        this.user = user;
      }

    });

    this.lesson = lessons[this.$stateParams.number - 1];

  }

  
  noAccessShow() {
    this.lesson = false;
    this.user = {};
    this.mdDialog.show(
      this.mdDialog.alert()
        .parent(angular.element(document.body))
        .clickOutsideToClose(true)
        .title('Нет доступа')
        .textContent('У вас нет доступа к этому занятию')
        .ariaLabel('Lesson access error')
        .ok('Понятно!')
      //.targetEvent(ev);
    ).then(function() {
      //this.$state.go('crm.training.list')
    });
    this.$state.go('crm.training.list')
  }

  onTaskDoneChange (id) {
    console.log(this.lesson.task[id-1].done);
  }

  changeTasks () {
    data = {
      lesson: parseInt(this.$stateParams.number),
      fullInfo: this.user.profile.couching.lessons[this.$stateParams.number - 1]
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
  
