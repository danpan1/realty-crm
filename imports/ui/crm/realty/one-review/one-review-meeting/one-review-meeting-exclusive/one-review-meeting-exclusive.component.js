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
  constructor($scope, $reactive, $stateParams, $timeout) {

    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    
  }

  isExclusiveFunc(trueOrFalse) {
    this.isExclusive = trueOrFalse;
    this.$timeout(()=>{
      this.saveReview();
    },1)
  }

}


const moduleName = 'oneReviewMeetingExclusive';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review-meeting/one-review-meeting-exclusive/one-review-meeting-exclusive.view.html',
    bindings: {
        isExclusive:'=',
        saveReview:'&'
    },
    controllerAs: moduleName,
    controller: OneReviewMeetingExclusive
  });

