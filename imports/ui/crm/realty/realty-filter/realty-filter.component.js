/**
 * Created by Danpan on 26.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../../api/dictionary/dictionary';
import {name as discrictsAreaIdList} from '/imports/ui/shared/disctrict-chips/disctrict-chips.component';
import './realty-filter.view.html';

class RealtyFilter {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    console.log(dictionary);
    this.renovation = dictionary.renovation;
    this.conditions = dictionary.conditions;
    this.filter = {};
  }

}

const moduleName = 'realtyFilter';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  discrictsAreaIdList
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/realty-filter/realty-filter.view.html',
    bindings: {
      filter:'='
    },
    controllerAs: moduleName,
    controller: RealtyFilter
  });

