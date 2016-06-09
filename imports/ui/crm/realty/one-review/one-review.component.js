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
  constructor($scope, $reactive, $stateParams, $timeout, UploadResize, $q, $filter) {

    $reactive(this).attach($scope);
    this.qqq = $q;
    this.filter = $filter;
    this.resize = UploadResize;
    this.$timeout = $timeout;
    let vm = this;
    this.analytics = {};
    this.uploadImagesNormalLength = 0;
    this.uploadThumbnailsLength = 0;
    this.mainImage = '';
    this.subscribe('oneInfo', () => {
      return [
        $stateParams.realtyId
      ];
    }, {
      onReady() {
        vm.realty = Realty.findOne({});
        if (vm.realty.details && vm.realty.details.thumbnails && vm.realty.details.images) vm.findMainImage(vm.realty.image);
      }
    });

    this.helpers({
      realty: () => {
        return Realty.findOne({_id : $stateParams.realtyId});
      }
    });
    
    let subwaysEmb = this.realty.address.subwaysEmbedded.map((value) => { return value.name; });
    Meteor.call('objectAnalytics', this.realty.type, this.realty.roomcount, subwaysEmb, this.realty.details.materials, this.realty.details.renovation, (err, result) => {
      if (err) {
        console.log('err: ' + err);
      } else {
        this.$timeout(()=>{
          this.analytics.avgPrice = result.map((item) => {return parseInt(item)})[0];
          this.analytics.comparison = this.analytics.avgPrice > this.realty.price;
          this.analytics.difference = this.analytics.comparison ? this.analytics.avgPrice - this.realty.price : this.realty.price - this.analytics.avgPrice;
          this.analytics.marketOk = !this.analytics.comparison && this.analytics.difference > this.analytics.avgPrice / 10 ? 'Цена слишком высокая' : this.analytics.comparison && this.analytics.difference > this.analytics.avgPrice / 10 ? 'Цена слишком низкая' : 'Цена в рынке!';
        })
      }
    });
  }

  removeImage(image, index) {
    if (image.url === this.realty.image) {
      this.realty.image = '';
      // TODO find New Main image
    }
    this.s3DeleteImage(index);
  }

  setMainImage(image, index) {
    if (image) {
      this.realty.image = image.url;
      this.findMainImage(image.url, index);
      this.saveNewDescription();
    }
  }

  findMainImage(imageUrl, index) {
    if (!imageUrl) {
      return;
    }
    let imageIndexThumbs = index || this.realty.details.thumbnails.findIndex((item)=> {
        return (item.url === imageUrl);
      });

    this.mainImage = this.realty.details.thumbnails[imageIndexThumbs].url;

  }

  sendToModerator() {
    if (!this.realty.moderator) {
      this.realty.moderator = {};
    }
    this.realty.moderator.status = 'todo';
    this.saveNewDescription();
  }

// удаление фото из Amazon S3
  s3DeleteImage(index) {
    let smallImage = this.realty.details.thumbnails.splice(index, 1);
    let bigImage = this.realty.details.images.splice(index, 1);

    S3.delete(smallImage[0].relative_url);
    S3.delete(bigImage[0].relative_url);

    this.saveNewDescription();
  }

// удаление фото из View

  uploadImages(filesNormal) {
    const vm = this;
    if (!filesNormal) {
      return;
    }
    this.uploadImagesNormalLength = filesNormal.length;
    let promises = [];
    //Ресайзим
    filesNormal.forEach((file)=> {
      promises.push(this.resize.resize(file, 186, 139));
    });
    //КОгда все отресайзится тогда заливаем
    this.qqq.all(promises).then((smallImages)=> {
      this.uploadThumbnails(smallImages);
    });

    let resultsImages = [];
    S3.upload({
      files: filesNormal,
      path: ''
    }, (error, result) => {
      if (error) {
        this.showLoader = false;
        console.log(error);
      } else {
        vm.uploadImagesNormalLength--;
        result.originalName = result.file.original_name;
        resultsImages.push(result);
        if (vm.uploadImagesNormalLength === 0) {
          vm.saveImages(resultsImages);
        }
      }
    });
  }

  saveImages(resultsImages) {
    if (!this.realty.details.images) {
      this.realty.details.images = [];
    }
    console.log('saveImages');
    console.log(resultsImages);
    let ordered = this.filter('orderBy')(resultsImages, 'originalName');
    this.realty.details.images = this.realty.details.images.concat(ordered);
    console.log('this.realty.details.images', this.realty.details.images);
    this.saveNewDescription();
  }

  saveThumbnails(resultsImages) {
    if (!this.realty.details.thumbnails) {
      this.realty.details.thumbnails = [];
    }
    console.log('saveThumbnails');
    console.log(resultsImages);
    let orderred = this.filter('orderBy')(resultsImages, 'originalName');
    this.realty.details.thumbnails = this.realty.details.thumbnails.concat(orderred);
    console.log('this.realty.details.thumbnails', this.realty.details.thumbnails);
    if (!this.realty.image) {
      this.setMainImage(this.realty.details.thumbnails[0]);
    }
    this.saveNewDescription();
  }

  uploadThumbnails(files) {
    if (!files) {
      return;
    }
    this.uploadThumbnailsLength = files.length;
    let uploadResult = [];
    S3.upload({
      files: files,
      path: ''
    }, (error, result) => {
      if (error) {
        console.log(error);
        this.showLoader = false;
      } else {
        this.uploadThumbnailsLength--;
        result.originalName = result.file.original_name;
        uploadResult.push(result);
        if (this.uploadThumbnailsLength === 0) {
          this.saveThumbnails(uploadResult);
        }
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
  saveNewDescription(id, descr) {
    if (descr) {
      this.descriptionSaved = true;
      this.$timeout(()=> {
        this.descriptionSaved = false;
      }, 3000)
    }
    if (this.uploadImagesNormalLength !== 0 || this.uploadThumbnailsLength !== 0) {
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
    Realty.update({_id: this.realty._id}, {
      $set: this.realty
    }, (error) => {
      if (error) {
        console.log(error);
        this.showLoader = false;
      } else {
        console.log('Description updated!');
        this.showLoader = false;
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

