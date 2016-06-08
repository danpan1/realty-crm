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
  constructor($scope, $reactive, $stateParams, $timeout, $mdToast) {

    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    let vm = this;
    this.mdToast = $mdToast;
    this.uploadThumbsImagesLength = 0;
    this.uploadNormalLength = 0;
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
        return Realty.findOne({});
      }
    });

  }
  
  showSimpleToast () {
    this.mdToast.show(
      this.mdToast.simple()
        .textContent('Данные обновлены!')
        .position('top right')
        .hideDelay(3000)
        .action('ОК')
    );
  };

  removeImage(image) {
    var imageIndex;
    if (image.originalName.match(/0\/\d+/)) {
      let imageOriginal = image.originalName.match(/0\/\d+/)[0].slice(2);
      imageIndex = this.realty.details.thumbnails.findIndex((item)=> {
        let itemOriginal = item.originalName.match(/5\/\d+/)[0].slice(2);
        return (itemOriginal === imageOriginal);
      });
    } else {
      imageIndex = this.realty.details.thumbnails.findIndex((item)=> {
        return (item.originalName === image.originalName);
      });
    }
    //console.log(this.realty.image + ' === ' + this.realty.details.thumbnails[imageIndex].url)
    //if (this.realty.image === this.realty.details.thumbnails[imageIndex].url) {
    //  var imageNormalIndex = this.realty.details.images.findIndex((item)=> {
    //    return (item.originalName === image.originalName);
    //  });
      this.realty.image = '';
    //  if (this.realty.details.images[imageNormalIndex+1]) this.setMainImage(this.realty.details.images[imageNormalIndex+1]);
    //  else this.setMainImage(this.realty.details.images[imageNormalIndex - 1]);
    //  this.s3DeleteImage(image);
    //} else{
      this.s3DeleteImage(image); 
    //}
  }

  setMainImage(image) {
    if (image) {
      var imageIndex;
      if (image.originalName.match(/0\/\d+/)) {
        let imageOriginal = image.originalName.match(/0\/\d+/)[0].slice(2);
        imageIndex = this.realty.details.thumbnails.findIndex((item)=> {
          let itemOriginal = item.originalName.match(/5\/\d+/)[0].slice(2);
          return (itemOriginal === imageOriginal);
        });
      } else { 
        imageIndex = this.realty.details.thumbnails.findIndex((item)=> {
          return (item.originalName === image.originalName);
        });
      }
      this.realty.image = this.realty.details.thumbnails[imageIndex].url;
      this.findMainImage(this.realty.image);
      this.saveNewDescription();
    }
  }

  findMainImage(imageUrl) {
    let vm = this;
    if (imageUrl) {
      let imageIndexThumbs = this.realty.details.thumbnails.findIndex((item)=> {
        return (item.url === imageUrl);
      });
      var imageIndex;
      if (imageUrl.match(/5\/\d+/)) {
        let imageOriginal = imageUrl.match(/5\/\d+/)[0].slice(2);
        imageIndex = this.realty.details.images.findIndex((item)=> {
          let itemOriginal = item.originalName.match(/0\/\d+/)[0].slice(2);
          return (imageOriginal === itemOriginal);
        });
      } else { 
        imageIndex = this.realty.details.images.findIndex((item)=> {
          return (item.originalName === this.realty.details.thumbnails[imageIndexThumbs].originalName);
        });
      }
      vm.mainImage = vm.realty.details.images[imageIndex].url;
    }
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
    var imageIndex;
    if (image.originalName.match(/0\/\d+/)) {
      let imageOriginal = image.originalName.match(/0\/\d+/)[0].slice(2);
      imageIndex = this.realty.details.thumbnails.findIndex((item)=> {
        let itemOriginal = item.originalName.match(/5\/\d+/)[0].slice(2);
        return (itemOriginal === imageOriginal);
      });
    } else {
      imageIndex = this.realty.details.thumbnails.findIndex((item)=> {
        return (item.originalName === image.originalName);
      });
    }
    let imageNormalIndex = this.realty.details.images.findIndex((item)=> {
      return (item.originalName === image.originalName);
    });
/*
    console.log(this.realty.details.thumbnails[imageIndex].originalName + ' == ' + this.realty.image)
    if(this.realty.details.thumbnails[imageIndex].originalName == this.realty.image){
      if (this.realty.details.images[imageNormalIndex+1]) this.setMainImage(this.realty.details.images[imageNormalIndex+1]);
      else this.setMainImage(this.realty.details.images[imageNormalIndex - 1]);
    }*/
    
    let smallImage = this.realty.details.thumbnails.splice(imageIndex, 1);
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
    let vm = this;
    if (files) {
      this.uploadThumbsImagesLength = files.length;
    }

    S3.upload({
      files: files,
      path: ''
    }, (error, result) => {
      if (error) {
        this.showLoader = false;
        console.log(error);
      } else {
        this.uploadThumbsImagesLength--;
        if (!this.realty.details.thumbnails) {
          this.realty.details.thumbnails = [];
        }

        this.$timeout(()=> {
          result.originalName = result.file.original_name;
          this.realty.details.thumbnails.push(result);
          /*if(!this.realty.image) this.realty.image = this.realty.details.thumbnails[0].url;
           vm.setMainImage();*/
          this.saveNewDescription();
        }, 0);
        // console.log('uploaded images', this.realty.details.images);
      }
    });
  }


  uploadNormalImages(files) {
    var vm = this;
    this.showLoader = true;
    if (files) {
      this.uploadNormalLength = files.length;
    }
    S3.upload({
      files: files,
      path: ''
    }, (error, result) => {
      if (error) {
        console.log(error);
        this.showLoader = false;
      } else {
        this.uploadNormalLength--;
        if (!this.realty.details.images) {
          this.realty.details.images = [];
        }

        this.$timeout(()=> {
          result.originalName = result.file.original_name;
          this.realty.details.images.push(result);
          if (!this.realty.image) vm.setMainImage(result);
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
  saveNewDescription(id, descr) {
    if (descr) {
      this.descriptionSaved = true;
      this.$timeout(()=>{
        this.descriptionSaved = false;
      },3000)
    }
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
    this.showLoader = true;
    Realty.update({_id: this.realty._id}, {
      $set: this.realty
    }, (error) => {
      if (error) {
        console.log(error);
        this.showLoader = false;
      } else {
        this.showSimpleToast();
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

