/**
 * Created by Danpan on 25.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {Realty} from '/imports/api/realty';
import {dictionary} from '../../../helpers/dictionary';

import './parsing-stats.view.html';

class ParsingStats {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    let vm = this;
    this.dictionary = dictionary;
    
    
    Meteor.call('parsingStats', (error, result) => {
      if (error) {
        console.log('error');
        console.log(error);
      } else {
        this.reasons = result; 
        this.all = 0;
        result.map((item) => {
          this.all += item.count;
        }) 
        for(var i in this.reasons){
          this.reasons[i].percent = Math.ceil((this.reasons[i].count * 100 / this.all) * 100 ) / 100;
        };
        console.log(this.reasons);
      }
    });
    
  }
  
  countParsers () {
  }
  
}

const moduleName = 'parsingStats';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/call-center/parsing-stats/parsing-stats.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ParsingStats
});
