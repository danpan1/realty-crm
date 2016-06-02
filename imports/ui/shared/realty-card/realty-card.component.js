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
    this.show = true;
  }

  agentContinue (id) {
    if(id) this.objectAdded = true;
    else this.show = false;
  }

  changeRelationType(type,realtyId, clientId, isNew) {
    Meteor.call('changeRelationTypeInClient', type,realtyId,clientId,isNew);
  }

  takeObject(id){
    console.log(id);
    this.objectAdded = true;
  }

  takeRealty(id) {
    console.log(id, 'takeRealty');
    Meteor.call('takeRealty', id, (err, result)=>{
      if (err){
        console.log(err);
      }else {
        console.log(result);
      }
    });
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
    this.slider({'images': this.realty.details.images});
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
    relationType: '@',
    clientId: '<',
    realtylisttype: '<'
  },
  controllerAs: moduleName,
  controller: RealtyCard
});
