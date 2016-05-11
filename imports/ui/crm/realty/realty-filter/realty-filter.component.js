/**
 * Created by Danpan on 26.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../../api/dictionary';
import {name as districtsAreaIdList} from '/imports/ui/shared/district-chips/district-chips.component.js';
import './realty-filter.view.html';

class RealtyFilter {
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    this.$timeout = $timeout;
    $reactive(this).attach($scope);
    console.log(dictionary);
    this.filter = {};
    this.filter.roomcount = [];
    this.dictionary = dictionary;
    // this.conditions = dictionary.conditions;
  }

  toggleRoomcount(item) {
    this.$timeout(()=> {
      var idx = this.filter.roomcount.indexOf(item);
      if (idx > -1) {
        this.filter.roomcount.splice(idx, 1);
      }
      else {
        this.filter.roomcount.push(item);
      }
      this.roomcount = this.filter.roomcount.slice();
    }, 0);
    // console.log(this.roomcount);
    // console.log(this.filter);
  }

  existsRoomcount(item) {
    // console.log(this.filter.roomcount);
    return this.filter.roomcount.indexOf(item) > -1;
  }

}

const moduleName = 'realtyFilter';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  districtsAreaIdList
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/realty-filter/realty-filter.view.html',
  bindings: {
    filter: '=',
    roomcount: '='
  },
  controllerAs: moduleName,
  controller: RealtyFilter
});

