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
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    this.noCache = false;

    this.$onChanges = function () {
      this.searchTextHouse = '';
      this.searchTextStreet = '';
    }
    if(typeof this.street == 'string') {
      this.findStreetAtCallCenter = true;
      this.querySearch(this.street);
    }
    console.log(this.street);
    this.label = this.isFilter ? 'Дом' : 'Дом и корпус'
  }

  clearHouse() {
    this.searchTextHouse = '';
  }

  someChanges () {
    this.$timeout(() => {
      this.streetChanged();
    },100)
  }

  querySearch(query) {
    console.log('querySearch: ',query);
    if (!query) {
      console.log('!query')
      return;
    }
    this.someChanges();
    return AddressService.search({
      'from_bound': {'value': 'street'},
      'to_bound': {'value': 'street'},
      'locations': [{'region': 'москва'}],
      'restrict_value': true,
      'query': query, count: 10
    }).then((res)=> {
      if(this.findStreetAtCallCenter){
        this.street = res.suggestions[0];
        this.querySearchHouse(this.house);
      } else this.clearHouse();
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
        if(this.findStreetAtCallCenter){
          this.house = res.suggestions[0];
          this.findStreetAtCallCenter = false;
        }
        return res.suggestions;
      });
    }
  }
  // в DADATA приходится запрашивать с параметром count : 1, чтобы получить Район и Координаты
  requestFullData(query) {
    this.someChanges();
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
    refresh:'<',
    streetChanged: '&'
  },
  controllerAs: moduleName,
  controller: RealtyStreet
});
