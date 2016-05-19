/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';
import {name as OneReviewDesc} from './one-review-desc/one-review-desc.component';

import './one-review.view.html';

class OneReview {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams, $timeout) {

    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    let vm = this;
    this.uploadThumbsImagesLength = 0;
    this.uploadNormalLength = 0;
    this.subscribe('oneInfo', () => {
      return [
        $stateParams.realtyId
      ];
    }, {
      onReady() {
        vm.realty = Realty.findOne({});
        // vm.prepareRealty();
      }
    });

    this.helpers({
      realty: () => {
        return Realty.findOne({});
      }
    });

  }

  removeImage(image) {
    let imageIndex = this.realty.details.thumbnails.findIndex((item)=> {
      return (item.originalName === image.originalName);
    });
    if (this.realty.image === this.realty.details.thumbnails[imageIndex].url) {
      console.log('removeImage mainImage',this.realty.image);
      this.realty.image = '';
    }
    this.s3DeleteImage(image);
  }

  setMainImage(image) {
    let imageIndex = this.realty.details.thumbnails.findIndex((item)=> {
      return (item.originalName === image.originalName);
    });
    this.realty.image = this.realty.details.thumbnails[imageIndex].url;
    console.log('setMainImage',this.realty.image);
    this.saveNewDescription();
  }

  sendToModerator() {
    if (!this.realty.moderator) {
      this.realty.moderator = {};
    }
    this.realty.moderator.status = 'todo';
    this.saveNewDescription();
  }

  // удаление фото из Amazon S3
  s3DeleteImage(image) {
    // debugger
    // let a = [1,2,3]
    let imageIndex = this.realty.details.thumbnails.findIndex((item)=> {
      return (item.originalName === image.originalName);
    });
    let imageNormalIndex = this.realty.details.images.findIndex((item)=> {
      return (item.originalName === image.originalName);
    });

    let smallImage = this.realty.details.thumbnails.splice(imageIndex, 1);
    // console.log(this.realty.details.images.length);
    let bigImage = this.realty.details.images.splice(imageNormalIndex, 1);

    S3.delete(smallImage[0].relative_url, (error)=> {
        if (error) {
          console.log(error);
        }
      }
    );

    S3.delete(bigImage[0].relative_url, (error)=> {
        if (error) {
          console.log(error);
        }
      }
    );

    this.saveNewDescription();
  }

  // удаление фото из View

  uploadThumbImages(files) {
    console.log(files);
    if (files) {
      this.uploadThumbsImagesLength = files.length;
    }

    S3.upload({
      files: files,
      path: ''
    }, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        this.uploadThumbsImagesLength--;
        if (!this.realty.details.thumbnails) {
          this.realty.details.thumbnails = [];
        }

        this.$timeout(()=> {
          console.log(result.file, 'small uploaded');
          console.log(result);
          result.originalName = result.file.original_name;
          this.realty.details.thumbnails.push(result);
          this.saveNewDescription();
        }, 0);
        // console.log('uploaded images', this.realty.details.images);
      }
    });
  }


  uploadNormalImages(files) {
    console.log(files);
    if (files) {
      this.uploadNormalLength = files.length;
    }
    S3.upload({
      files: files,
      path: ''
    }, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        this.uploadNormalLength--;
        if (!this.realty.details.images) {
          this.realty.details.images = [];
        }

        this.$timeout(()=> {
          console.log(result.file, 'big uploaded');
          console.log(result);
          result.originalName = result.file.original_name;
          this.realty.details.images.push(result);
          this.saveNewDescription();
        }, 0);
        // console.log('uploaded images', this.realty.details.images);
      }
    });
  }

  isExclusive(isExclusive) {
    this.realty.realtor.isExclusive = isExclusive;
    this.saveNewDescription();
  }

  isCheckout(isCheckout) {
    this.realty.realtor.isCheckout = isCheckout;
    this.saveNewDescription();
  }

  /* Сохранение описания и заголовка на сервер */
  saveNewDescription() {
    if (this.uploadThumbsImagesLength !== 0 || this.uploadNormalLength !== 0) {
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
    console.log(this.realty);
    Realty.update({_id: this.realty._id}, {
      $set: this.realty
    }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Description updated!');
      }
    });
  }

}

const moduleName = 'oneReview';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  OneReviewDesc
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/one-review/one-review.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: OneReview
});

