/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';

import './one-review-meeting-browsing.view.html';

class OneReviewMeetingBrowsing {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams, $timeout) {

    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    
  }
  
  isCheckoutFunc(trueOrFalse) {
    this.isCheckout = trueOrFalse;
    this.$timeout(()=>{
      this.saveReview();
    },100)
  }

}


const moduleName = 'oneReviewMeetingBrowsing';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review-meeting/one-review-meeting-browsing/one-review-meeting-browsing.view.html',
    bindings: {
        isCheckout:'=',
        saveReview:'&'
    },
    controllerAs: moduleName,
    controller: OneReviewMeetingBrowsing
  });

