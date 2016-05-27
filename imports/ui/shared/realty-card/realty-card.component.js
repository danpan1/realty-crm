/**
 * Created by Danpan on 10.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../helpers/dictionary';
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
  
  updateRealty (id) {
    Realty.update({_id: id}, {
      $set: this.realty
    }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('call recieved newObj');
      }
    });
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
    slider: '&',
    isNew: '<',
    realtylisttype: '<'
  },
  controllerAs: moduleName,
  controller: RealtyCard
});
