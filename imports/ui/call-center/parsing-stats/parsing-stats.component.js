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
    this.parsers = {};
  }
  
  countParsers () {
    Meteor.call('parsingStats', (error, result) => {
      if (error) {
        console.log('error');
        console.log(error);
      } else {
        console.log(result);
        this.parsers = result; 
      }
    });
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
