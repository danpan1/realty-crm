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
  
  toggle  (item) {
      if(!this.conditionsSelected){
        this.conditionsSelected = [];
        this.conditionsSelected.push(item);
      }else{
        var checkConditionExist = false;
        for(var i in this.conditionsSelected){
            if(this.conditionsSelected[i]==item) {
                checkConditionExist = true;
                this.conditionsSelected.splice(i,1);
                break;
            }
        }
        if(!checkConditionExist) this.conditionsSelected.push(item);
      }
  };
      

}

const moduleName = 'realtyConditions';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/shared/realty-conditions/realty-conditions.view.html',
    bindings: {
      conditionsSelected: '=ngModel',
      checkbox: '='
    },
    controllerAs: moduleName,
    controller: RealtyConditions
  });
