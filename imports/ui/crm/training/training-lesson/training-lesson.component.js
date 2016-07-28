/**
 * Created by Danpan on 23.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {lessons} from '../training-array.js'

import './training-lesson.view.html';

class TrainingLesson {
  /* @ngInject */
  constructor($scope, $reactive, $http, $mdDialog, $timeout, $state, $stateParams) {
    $reactive(this).attach($scope);
    let vm = this;
    this.$timeout = $timeout;
    vm.lessonData = {};
    this.$stateParams = $stateParams;
    this.mdDialog = $mdDialog;
    this.$state = $state;
    this.lessonNumber = this.$stateParams.number - 1;
    this.lessons = lessons;
    console.log(this.lessons);
    console.log('this.$stateParams.number: ');
    console.log(this.$stateParams.number);
    
    if (parseInt(this.$stateParams.number) <= 6) {
      this.lesson = this.lessons[parseInt(this.$stateParams.number) + 1];
    }
    else if (parseInt(this.$stateParams.number) == 7) {
      this.lesson = this.lessons[0];
    }
    else if (parseInt(this.$stateParams.number) == 8) {
      this.lesson = this.lessons[1];
    }
    console.log(this.lesson);
    
    this.autorun(function () {

      let user = Meteor.user();
      if (user) {

        if (this.$stateParams.number <= 6) {
          Meteor.call('checkLessonAccess', this.$stateParams.number, (err, lesson) => {
            if (err) {
              console.log('==== checkLessonAccess ERROR', err);
            } else {
              console.log(lesson)
              if (lesson.lessonNumber > 1) vm.noAccessShow();
              this.$timeout(()=>{
                vm.lessonData = lesson;
              },100)
            }
          });
        }

      }

    });

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
    data = this.lessonData;
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
  
