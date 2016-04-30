/* global angular */
'use strict';
import angular from 'angular';
import ngMaterial from 'angular-material';
import './lightbox.html';
const moduleName = 'ngLightbox';

export default angular.module(moduleName, [ngMaterial]).directive('mdLightbox', ['$mdDialog', '$galleryService', '$mdToast', function ($mdDialog, $galleryService, $mdToast) {
  return {
    link: function ($scope, elem, attrs) {
      elem.addClass('image-click');

      elem.on('click', function () {
        var image = attrs.mdLightboxImage;
        var key = attrs.mdLightboxKey;
        var parentScope = $scope.$parent;
        showLightboxModal(key, image, parentScope);
      });

      //Lightbox Modal
      function showLightboxModal(key, image, parentScope) {
        function lightboxController($scope, $mdDialog) {
          $scope.image = JSON.parse(image);
          $scope.images = parentScope.images;
          $scope.isActionShow = parentScope.isActionShow;
          $scope.cancel = function () {
            $mdDialog.cancel();
          };
          $scope.delete = function () {
            var fileUrl = $scope.image.url;
            var fileName = fileUrl.replace('https://storage.googleapis.com/nails-cloud/', '');
            console.log(fileName);
            delete $scope.images[key];
            $galleryService.deleteImage(key, fileName);
            $mdToast.show(
              $mdToast.simple()
                .content('File deleted successfully')
                .position('bottom right')
                .hideDelay(2000)
            );

            $mdDialog.cancel();
          };

        }

        var confirm = $mdDialog.confirm({
          templateUrl: 'imports/ui/shared/lightbox/lightbox.html',
          clickOutsideToClose: true,
          controller: lightboxController
        });

        $mdDialog.show(confirm);

      }
    }
  };
}]);
