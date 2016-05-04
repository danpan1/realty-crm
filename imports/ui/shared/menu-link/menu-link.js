'use strict';
import angular from 'angular';
import ngMaterial from 'angular-material';
import './menu-link.view.html';

const moduleName = 'menuLink';

export default angular.module(moduleName,[ngMaterial]).directive(function() {
    return {
      scope: {
        section: '='
      },
      templateUrl: 'imports/ui/shared/menu-link/menu-link.view.html',
      link: function ($scope, $element) {

        var controller = $element.parent().controller();

        $scope.focusSection = function () {
          // set flag to be used later when
          // $locationChangeSuccess calls openPage()
          controller.autoFocusContent = true;
        };
      }
    };
});