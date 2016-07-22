/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';
import {dictionary} from '/imports/helpers/dictionary';

import './one-review-moderator.view.html';

class OneReviewModerator {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {

    $reactive(this).attach($scope);
    this.dictionary = dictionary;
  }

  sendToModerator() {

  }
}

const moduleName = 'oneReviewModerator';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/one-review/one-review-moderator/one-review-moderator.view.html',
  bindings: {
    realty: '=',
  },
  controllerAs: moduleName,
  controller: OneReviewModerator
});

