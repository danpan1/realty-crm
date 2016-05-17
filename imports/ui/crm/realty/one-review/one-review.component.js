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
    this.uploadLength = 0;
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
    this.realty.details.images = this.realty.details.images.filter((item) => {
      return item.url != image.url;
    });
    if (this.realty.image == image.url) {
      this.realty.image = '';
    }
    this.saveNewDescription();
    this.s3DeleteImage(image);
  }

  setMainImage(image) {
    this.realty.image = image.url;
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
    S3.delete(image.relative_url, (error)=> {
        if (error) {
          console.log(error);
        }
      }
    );
  }

  // удаление фото из View

  upload(files) {
    console.log(files);
    if (files) {
      this.uploadLength = files.length;
    }
    S3.upload({
      files: files,
      path: ''
    }, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        this.uploadLength--;
        if (!this.realty.details.images) {
          this.realty.details.images = [];
        }

        this.$timeout(()=> {
          this.realty.details.images.push(result);
          this.saveNewDescription();
        }, 0);
        // console.log('uploaded images', this.realty.details.images);
      }
    });

    // this.Upload.upload({
    //   url: 'upload/url',
    //   data: {file: file, 'username': $scope.username}
    // }).then(function (resp) {
    //   console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    // }, function (resp) {
    //   console.log('Error status: ' + resp.status);
    // }, function (evt) {
    //   var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //   console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    // });
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
    if (this.uploadLength !== 0) {
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
    this.realty.moderator.percent.total = percent.photo + percent.advertisement + percent.description + percent.isExclusive + percent.isCheckout;
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

