/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';

import './one-review-advert-irr.view.html';

class OneReviewAdvertIrr {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {

    $reactive(this).attach($scope);
    
  }

}


const moduleName = 'oneReviewAdvertIrr';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review-advert/one-review-advert-irr/one-review-advert-irr.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: OneReviewAdvertIrr
  });

