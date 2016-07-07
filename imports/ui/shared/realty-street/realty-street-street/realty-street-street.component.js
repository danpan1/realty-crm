/**
 * Created by Danpan on 09.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {AddressService} from '/imports/helpers/AddressService';
import './realty-street-street.view.html';

class RealtyStreetStreet {
  constructor() {
    this.noCache = false;
  }

  streetQuerySearch(query) {
    this.querySearch({query:query});
  }

}

const moduleName = 'realtyStreetStreet';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/realty-street/realty-street-street/realty-street-street.view.html',
  bindings: {
    street: '=ngModel',
    querySearch: '&'
  },
  controllerAs: moduleName,
  controller: RealtyStreetStreet
});
