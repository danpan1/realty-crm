/**
 * Created by Danpan on 09.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '/imports/api/dictionary';
import './realty-conditions.view.html';

class RealtyConditions {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    this.conditionsDictionary = dictionary.conditions;
  }

}

const moduleName = 'realtyConditions';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/shared/realty-conditions/realty-conditions.view.html',
    bindings: {
      conditionsSelected: '=ngModel'
    },
    controllerAs: moduleName,
    controller: RealtyConditions
  });
