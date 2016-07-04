/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';

import './one-review-meeting-exclusive.view.html';

class OneReviewMeetingExclusive {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {

    $reactive(this).attach($scope);
    
  }

  isExclusive(trueOrFalse) {
    this.isexclusive = trueOrFalse;
    this.savereview();
  }

}


const moduleName = 'oneReviewMeetingExclusive';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review-meeting/one-review-meeting-exclusive/one-review-meeting-exclusive.view.html',
    bindings: {
        isexclusive:'=',
        savereview:'&'
    },
    controllerAs: moduleName,
    controller: OneReviewMeetingExclusive
  });

