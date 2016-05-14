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
  constructor($scope, $reactive, $stateParams, Upload) {

    $reactive(this).attach($scope);
    this.Upload = Upload;
    let vm = this;

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

  upload(file) {
    console.log('start upload');
    console.log(S3);
    S3.upload({
      files: file,
      path: ''
    }, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log('uploaded');
        console.log(result);
      }
      // else {
      //   vm.addImagesToRealty(result);
      //   if (filesToUpload.length == index) {
      //     vm.isUploading = false;
      //     vm.uploader.clearQueue();
      //   } else {
      //     index++;
      //   }
      // }
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

