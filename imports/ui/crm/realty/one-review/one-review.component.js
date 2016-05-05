/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';

import './one-review.view.html';

class OneReview {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {

    $reactive(this).attach($scope);

    this.subscribe('oneInfo',() => {
      return [
        {},
        true,
        $stateParams.realtyId
      ];
    });

    this.helpers({
      realty: () => {
        return Realty.findOne({});
      }
    });

  }

  upload() {
    console.log(this.realty);
  }

}

const moduleName = 'oneReview';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: OneReview
  });

