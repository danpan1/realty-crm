/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';

import './one-review-photo.view.html';

class OneReviewPhoto {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams, $timeout, UploadResize, $q, $filter, md5) {

    $reactive(this).attach($scope);
    let vm = this;
    this.$timeout = $timeout;
    this.md5 = md5;
    this.qqq = $q;
    this.filter = $filter;
    this.resize = UploadResize;
    this.mainImage = '';
    if (vm.realty.details && vm.realty.details.thumbnails && vm.realty.details.images) vm.findMainImage(vm.realty.image);

   }
   

  beforeChange(files) {
    if (files.length > 0) {
      this.showLoader = true;
    }
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
      this.savePhotos();
    }
  }

  findMainImage(imageUrl, index) {
    if (!imageUrl) {
      return;
    }
    if(this.realty.details.thumbnails.length){
      let imageIndexThumbs = index || this.realty.details.thumbnails.findIndex((item)=> {
        return (item.url === imageUrl);
      });
      this.mainImage = this.realty.details.thumbnails[imageIndexThumbs].url;
    }

  }
  
  
// удаление фото из Amazon S3
  s3DeleteImage(index) {
    let smallImage = this.realty.details.thumbnails.splice(index, 1);
    let bigImage = this.realty.details.images.splice(index, 1);

    S3.delete(smallImage[0].relative_url);
    S3.delete(bigImage[0].relative_url);

    this.savePhotos();
  }

// удаление фото из View

  getFileMd5Hash(blob) {
    const vm = this;
    let deferred = this.qqq.defer();
    let image = new FileReader();
    image.readAsBinaryString(blob);
    image.onloadend = function () {
      let imageResult = {
        hash: vm.md5.createHash(image.result),
        ngfName: blob.$ngfName,
        name: blob.name
      };
      deferred.resolve(imageResult);
    };
    return deferred.promise;
  }

  uploadImages(filesNormal) {
    const vm = this;
    if (!filesNormal) {
      this.showLoader = false;
      return;
    }


    try {
      this.imagecontrol = filesNormal.length;
      let promises = [];
      let promisesMD5 = [];
      //Ресайзим
      filesNormal.forEach((file)=> {
        promises.push(this.resize.resize(file, 186, 139));
      });
      //КОгда все отресайзится тогда заливаем
      this.qqq.all(promises).then((smallImages)=> {
        this.uploadThumbnails(smallImages);
      });

      //MD5 SUMMING XRENOV
      filesNormal.forEach((file)=> {
        promisesMD5.push(this.getFileMd5Hash(file));
      });
      //все файлы просчитают МД5
      this.qqq.all(promisesMD5).then((md5Hash)=> {
        let resultsImages = [];
        S3.upload({
          files: filesNormal,
          path: ''
        }, (error, result) => {
          if (error) {
            this.showLoader = false;
            console.log(error);
          } else {
            vm.imagecontrol--;
            result.originalName = result.file.original_name;
            result.md5Hash = md5Hash.find((hash)=> {
              return hash.name === result.originalName;
            }).hash;
            resultsImages.push(result);
            if (vm.imagecontrol === 0) {
              vm.saveImages(resultsImages);
            }
          }
        });
      });
    } catch (error) {
      console.log(error);
      this.showLoader = false;
    }
  }

  saveImages(resultsImages) {
    if (!this.realty.details.images) {
      this.realty.details.images = [];
    }
    console.log('saveImages');
    console.log(resultsImages);
    let ordered = this.filter('orderBy')(resultsImages, 'originalName');
    this.realty.details.images = this.realty.details.images.concat(ordered);
    this.savePhotos();
  }

  saveThumbnails(resultsImages) {
    if (!this.realty.details.thumbnails) {
      this.realty.details.thumbnails = [];
    }
    let orderred = this.filter('orderBy')(resultsImages, 'originalName');
    this.realty.details.thumbnails = this.realty.details.thumbnails.concat(orderred);
    if (!this.realty.image) {
      this.setMainImage(this.realty.details.thumbnails[0]);
    }
    this.savePhotos();
  }

  savePhotos () {
    this.$timeout(() => {
      this.savereview({id:this.realty._id});
    })
  }


  uploadThumbnails(files) {
    if (!files) {
      return;
    }
    this.thumbcontrol = files.length;
    let uploadResult = [];
    S3.upload({
      files: files,
      path: ''
    }, (error, result) => {
      if (error) {
        console.log(error);
        this.showLoader = false;
      } else {
        this.thumbcontrol--;
        result.originalName = result.file.original_name;
        uploadResult.push(result);
        if (this.thumbcontrol === 0) {
          this.saveThumbnails(uploadResult);
        }
      }
    });
  }

}


const moduleName = 'oneReviewPhoto';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review-photo/one-review-photo.view.html',
    bindings: {
        realty:'=',
        savereview:'&',
        thumbcontrol:'=',
        imagecontrol:'='
    },
    controllerAs: moduleName,
    controller: OneReviewPhoto
  });

