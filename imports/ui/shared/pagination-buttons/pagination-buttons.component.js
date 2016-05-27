/**
 * Created by Danpan on 10.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './pagination-buttons.view.html';

class PaginationButtons {
  /* @ngInject */
  constructor($scope, $reactive, $timeout, $state) {
    $reactive(this).attach($scope);
    let vm = this;
    
    this.state = $state;
  }
      
  goToPage (newPageNumber) {
      console.log(this.uisref);
      this.state.go(this.uisref, {page: newPageNumber}) ;
  }
  
}

const moduleName = 'paginationButtons';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/pagination-buttons/pagination-buttons.view.html',
  bindings: {
      page: '=',
      pagescount: '=',
      uisref:'='
  },
  controllerAs: moduleName,
  controller: PaginationButtons
});

