/**
 * Created by  Danpan on 25.04.16.
 */
import angular from 'angular';
import {Meteor} from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import {name as subwayChips} from '/imports/ui/shared/subway-chips/subway-chips.component';
import {name as subwayChoice} from '/imports/ui/shared/subway-choice/subway-choice.component';
import {name as realtyStreet} from '/imports/ui/shared/realty-street/realty-street.component';
import {name as districtSingle} from '/imports/ui/shared/district-single/district-single.component';
import {name as PriceMask} from '/imports/ui/shared/price-mask/price-mask.component';
import {dictionary} from '/imports/helpers/dictionary';
import './outgoing-call-details.view.html';

class OutgoingCallDetails {
  /* @ngInject */
  constructor($scope, $reactive, $timeout, $state) {
    $reactive(this).attach($scope);
    let vm = this;
    this.$state = $state;
    this.$timeout = $timeout;
    this.today = new Date();
    this.dictionary = dictionary;
    this.type = 4;
    this.newBuilding = 1;
    this.rentDuration = 0;
    if (this.realty.owner) this.realty.owner.qty = 0; // Собственников по умолчанию - 1
      else this.realty.owner = {qty: 0}
    if (this.realty.details) this.realty.details.bathQty = 0; // Санузлов по умолчанию - 1
      else this.realty.details = {bathQty: 0}
  }
}

const moduleName = 'outgoingCallDetails';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  realtyStreet,
  districtSingle,
  subwayChips,
  subwayChoice,
  PriceMask
]).component(moduleName, {
  templateUrl: 'imports/ui/call-center/outgoing-call/outgoing-call-details/outgoing-call-details.view.html',
  bindings: {
    realty: '=',
    newObjectRecieved: '<',
    showLoader: '<'
  },
  controllerAs: moduleName,
  controller: OutgoingCallDetails
})