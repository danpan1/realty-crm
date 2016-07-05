/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';
import {name as OneReviewDesc} from './one-review-desc/one-review-desc.component';
import {name as OneReviewAdvert} from './one-review-advert/one-review-advert.component';
import {name as OneReviewMeeting} from './one-review-meeting/one-review-meeting.component';
import {name as OneReviewPhoto} from './one-review-photo/one-review-photo.component';
import {name as OneReviewModerator} from './one-review-moderator/one-review-moderator.component';

import './one-review.view.html';

class OneReview {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams, $timeout) {
    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    let vm = this;
    this.uploadImagesNormalLength = 0;
    this.uploadThumbnailsLength = 0;
    this.subscribe('oneInfo', () => {
      return [
        $stateParams.realtyId
      ];
    }, {
      onReady() {
        vm.realty = Realty.findOne({});
      }
    });

    this.helpers({
      realty: () => {
        return Realty.findOne({_id: $stateParams.realtyId});
      }
    });
  }

  sendToModerator() {
    if (!this.realty.moderator) {
      this.realty.moderator = {};
    }
    this.realty.moderator.status = 'todo';
    this.saveNewDescription();
  }

  /* Сохранение описания и заголовка на сервер */
  saveNewDescription(id, descr) {
    console.log('Saving descr started')
    if (descr) {
      this.descriptionSaved = true;
      this.$timeout(()=> {
        this.descriptionSaved = false;
      }, 3000)
    }
    if (this.uploadImagesNormalLength !== 0 || this.uploadThumbnailsLength !== 0) {
      console.log(this.uploadImagesNormalLength);
      console.log(this.uploadThumbnailsLength);
      return;
    }
    // console.log('saveNewDescription');

    // let moderator = this.realty.moderator;
    if (!this.realty.moderator) {
      this.realty.moderator = {};
    }
    if (!this.realty.moderator.percent) {
      this.realty.moderator.percent = {
        advertisement: 0,
        photo: 0,
        description: 0
      };
    }
    let percent = this.realty.moderator.percent;
    percent.isExclusive = (this.realty.realtor.isExclusive) ? 20 : 0;
    percent.isCheckout = (this.realty.realtor.isCheckout) ? 20 : 0;
    this.realty.moderator.percent.total = ((percent.photo || 0) * 0.2) + ((percent.advertisement || 0) * 0.2) + ((percent.description || 0) * 0.2) + percent.isExclusive + percent.isCheckout;
    this.showLoader = true;
    console.log(this.realty);
    Realty.update({_id: this.realty._id}, {
      $set: this.realty
    }, (error) => {
      if (error) {
        console.log(error);
        this.$timeout(()=>{
          this.showLoader = false;
        })
      } else {
        console.log('Description updated!');
        this.$timeout(()=>{
          this.showLoader = false;
        })
      }
    });
  }

}

const moduleName = 'oneReview';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  OneReviewDesc,
  OneReviewModerator,
  OneReviewAdvert,
  OneReviewMeeting,
  OneReviewPhoto
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/one-review/one-review.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: OneReview
});
