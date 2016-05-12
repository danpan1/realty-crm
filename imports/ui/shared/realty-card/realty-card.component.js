/**
 * Created by Danpan on 10.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../api/dictionary';
import {Meteor} from 'meteor/meteor';

import './realty-card.view.html';

class RealtyCard {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
  }

  takeRealty(id) {
    Meteor.call('takeRealty', id);
  }

  showSlider() {
    this.slider({'images': this.realty.parseDetails.images});
  }
}

const moduleName = 'realtyCard';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/realty-card/realty-card.view.html',
  bindings: {
    realty: '<',
    slider: '&'
  },
  controllerAs: moduleName,
  controller: RealtyCard
});
