/**
 * Created by Danpan on 23.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import './training-list.view.html';

class TrainingList {
  /* @ngInject */
  constructor($scope, $reactive, $http, $timeout, $state, $stateParams) {
    $reactive(this).attach($scope);
    let vm = this;
    
    this.lessons = [
      {
        number:1,
        title:'Быстрый старт',
        descr:'Текст текст текст текст текст текст текст текст текст текст текст текст текст',
        picture:'img/common/training1.jpg',
        done: false,
        available: true
      },
      {
        number:2,
        title:'Поиск объектов',
        descr:'Текст текст текст текст текст текст текст текст текст текст текст текст текст',
        picture:'img/common/training2.jpg',
        done: false,
        available: false
      },
      {
        number:3,
        title:'Реклама',
        descr:'Текст текст текст текст текст текст текст текст текст текст текст текст текст',
        picture:'img/common/training3.jpg',
        done: false,
        available: false
      },
      {
        number:4,
        title:'Эффективные действия',
        descr:'Текст текст текст текст текст текст текст текст текст текст текст текст текст',
        picture:'img/common/training4.jpg',
        done: false,
        available: false
      },
      {
        number:5,
        title:'Встречи и заключение сделок',
        descr:'Текст текст текст текст текст текст текст текст текст текст текст текст текст',
        picture:'img/common/training5.jpg',
        done: false,
        available: false
      },
      {
        number:6,
        title:'Регулярный рост и системные действия',
        descr:'Текст текст текст текст текст текст текст текст текст текст текст текст текст',
        picture:'img/common/training6.jpg',
        done: false,
        available: false
      }
    ]

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
