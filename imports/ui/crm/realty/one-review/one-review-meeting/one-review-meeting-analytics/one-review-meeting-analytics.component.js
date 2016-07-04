/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';

import './one-review-meeting-analytics.view.html';

class OneReviewMeetingAnalytics {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams, $timeout) {

    $reactive(this).attach($scope);
    
    this.analytics = {};
    this.$timeout = $timeout;

    let subwaysEmb, district;
    if (this.realty.address.subwaysEmbedded) {
      subwaysEmb = this.realty.address.subwaysEmbedded.map((value) => {
        return value.name;
      });
    } else if (this.realty.address.districtId) {
      district = this.realty.address.districtId;
    }
    
    Meteor.call('objectAnalytics', this.realty.type, this.realty.roomcount, subwaysEmb, this.realty.details.materials, this.realty.details.renovation, district, (err, result) => {
      if (err) {
        console.log('err: ' + err);
      } else {
        this.$timeout(()=> {
          this.analytics.avgPrice = parseInt(result[0]);
          this.analytics.comparison = this.analytics.avgPrice > this.realty.price;
          this.analytics.difference = this.analytics.comparison ? this.analytics.avgPrice - this.realty.price : this.realty.price - this.analytics.avgPrice;
          this.analytics.marketOk = !this.analytics.comparison && this.analytics.difference > this.analytics.avgPrice / 10 ? 'Цена слишком высокая' : this.analytics.comparison && this.analytics.difference > this.analytics.avgPrice / 10 ? 'Цена слишком низкая' : 'Цена в рынке!';
        });
      }
    });

  }
}


const moduleName = 'oneReviewMeetingAnalytics';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review-meeting/one-review-meeting-analytics/one-review-meeting-analytics.view.html',
    bindings: {
        realty:'='
    },
    controllerAs: moduleName,
    controller: OneReviewMeetingAnalytics
  });

