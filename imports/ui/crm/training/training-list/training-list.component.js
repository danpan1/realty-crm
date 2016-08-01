/**
 * Created by Danpan on 23.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {lessons} from '../training-array.js'

import './training-list.view.html';

class TrainingList {
  /* @ngInject */
  constructor($scope, $reactive, $http, $timeout, $state, $stateParams) {
    $reactive(this).attach($scope);
    this.$state = $state;
    let vm = this;
    
    this.lessons = lessons;

    //this.intensivLessons = []

  }

  goToLesson (index, num) {
    if(index < 4){
     	this.$state.go('crm.training.lesson', {number:num});
    }
  }
  
}

const moduleName = 'trainingList';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/training/training-list/training-list.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: TrainingList
});
