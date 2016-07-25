/**
 * Created by Danpan on 09.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {AddressService} from '/imports/helpers/AddressService';
import './realty-street-house.view.html';

class RealtyStreetHouse {
  constructor() {
    this.noCache = false;
    console.log(this.house)
  }

  querySearchHouse(query) {
    this.querySearchHouse({query:query});
  }
  // в DADATA приходится запрашивать с параметром count : 1, чтобы получить Район и Координаты
  requestFullData(query) {
    this.requestFullData({query:query});
  }

}

const moduleName = 'realtyStreetHouse';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/realty-street/realty-street-house/realty-street-house.view.html',
  bindings: {
    house: '=ngModel',
    street: '<',
    querySearchHouse: '&',
    requestFullData: '&',
    searchTextHouse: '='
  },
  controllerAs: moduleName,
  controller: RealtyStreetHouse
});
