import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import './myList.view.html';

class MyList {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);
    this.perPage = 3;
    this.page = 1;
    this.sort = {
      name: 1
    };
    this.searchText = '';

  }

  pageChanged(newPage) {
    this.page = newPage;
  }

  sortChanged(sort) {
    this.sort = sort;
  }
}

const name = 'myList';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.view.html`,
    controllerAs: name,
    controller: MyList
  })
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('myList', {
      url: '/my/list',
      template: '<my-list/>'
    });
}