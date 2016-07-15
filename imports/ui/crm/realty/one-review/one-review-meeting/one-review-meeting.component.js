/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';

import {name as OneReviewMeetingAnalytics} from './one-review-meeting-analytics/one-review-meeting-analytics.component';
import {name as OneReviewMeetingBrowsing} from './one-review-meeting-browsing/one-review-meeting-browsing.component';
import {name as OneReviewMeetingExclusive} from './one-review-meeting-exclusive/one-review-meeting-exclusive.component';

import './one-review-meeting.view.html';

class OneReviewMeeting {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams, $timeout) {
    this.$timeout = $timeout;
    $reactive(this).attach($scope);

  }
  
  saveReview () {
    this.$timeout(()=>{
      this.saveReview({id:this.realty._id})
    })
  }
    
}


const moduleName = 'oneReviewMeeting';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  OneReviewMeetingAnalytics,
  OneReviewMeetingBrowsing,
  OneReviewMeetingExclusive
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review-meeting/one-review-meeting.view.html',
    bindings: {
        realty:'=',
        saveReview:'&'
    },
    controllerAs: moduleName,
    controller: OneReviewMeeting
  });

