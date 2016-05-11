/**
 * Created by Danpan on 09.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {AddressService} from '/imports/api/AddressService';
import './realty-street.view.html';

class RealtyStreet {
  /* @ngInject */
  constructor() {
  }

  querySearch(query) {
    const vm = this;
    console.log('request', query);
    return AddressService.search({
      'from_bound': {'value': 'street'},
      'to_bound': {'value': 'street'},
      'locations': [{'region': 'москва'}],
      'restrict_value': true,
      query: query, count: 5
    }).then((res)=> {
      vm.suggestionsStreetList = res.suggestions;
      // console.log(res.suggestions);
      return res.suggestions;
    });
  }

  clearHouse() {
    // console.log('clearHouse');
    // this.selectedHouse = {value: ' '};
  }

  querySearchHouse(query) {
    const vm = this;
    console.log('request', query);
    // console.log(vm.selectedStreet);
    // query = vm.selectedStreet.value + ' ' + query;
    return AddressService.search({
      'from_bound': {'value': 'house'},
      'to_bound': {'value': 'house'},
      'locations': [{'region': 'москва', 'street': vm.selectedStreet.data.street}],
      'restrict_value': true,
      query: query, count: 20
    }).then((res)=> {
      vm.suggestionsStreetList = res.suggestions;
      // console.log(res.suggestions);
      return res.suggestions;
    });
  }

}

const moduleName = 'realtyStreet';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/realty-street/realty-street.view.html',
  bindings: {
    selectedStreet: '=ngModel',
    selectedHouse:'=house'
  },
  controllerAs: moduleName,
  controller: RealtyStreet
});
