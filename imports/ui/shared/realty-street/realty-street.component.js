/**
 * Created by Danpan on 09.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {AddressService} from '/imports/helpers/AddressService';
import {name as RealtyStreetStreet} from './realty-street-street/realty-street-street.component';
import {name as RealtyStreetHouse} from './realty-street-house/realty-street-house.component';
import './realty-street.view.html';

class RealtyStreet {
  constructor() {
    this.noCache = false;

    this.$onChanges = function () {
      this.searchTextHouse = '';
      this.searchTextStreet = '';
    }

    this.label = this.isFilter ? 'Дом' : 'Дом и корпус'
  }

  clearHouse() {
    this.searchTextHouse = '';
  }

  querySearch(query) {
    console.log('querySearch: ',query);
    if (!query) {
      console.log('!query')
      return;
    }
    return AddressService.search({
      'from_bound': {'value': 'street'},
      'to_bound': {'value': 'street'},
      'locations': [{'region': 'москва'}],
      'restrict_value': true,
      'query': query, count: 10
    }).then((res)=> {
      this.clearHouse();
      return res.suggestions;
    });
  }

  querySearchHouse(query) {
    this.dataFull = null;
    if (!query) {
      console.log('house !query')
      return;
    }
    if (this.street && this.street.data) {
      return AddressService.search({
        'from_bound': {'value': 'house'},
        'to_bound': {'value': 'house'},
        'locations': [{'region': 'москва', 'street': this.street.data.street}],
        'restrict_value': true,
        'query': query, count: 10
      }).then((res)=> {
        return res.suggestions;
      });
    }
  }
  // в DADATA приходится запрашивать с параметром count : 1, чтобы получить Район и Координаты
  requestFullData(query) {
    if (query && query.unrestricted_value) {
      return AddressService.search({'query': query.unrestricted_value, count: 1}).then((res)=> {
        this.dataFull = res.suggestions[0];
      });
    }
  }

}

const moduleName = 'realtyStreet';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  RealtyStreetStreet,
  RealtyStreetHouse
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/realty-street/realty-street.view.html',
  bindings: {
    street: '=ngModel',
    house: '=house',
    dataFull: '=dadata',
    isFilter: '<',
    refresh:'<'
  },
  controllerAs: moduleName,
  controller: RealtyStreet
});
