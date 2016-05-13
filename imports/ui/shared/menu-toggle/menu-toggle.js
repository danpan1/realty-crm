'use strict';
import angular from 'angular';
import ngMaterial from 'angular-material';
import './menu-toggle.view.html';

const moduleName = 'ngMenuToggle';

export default angular.module(moduleName,[ngMaterial]).directive('menuToggle',function () {
  return {
    scope: {
      section: '='
    },
    templateUrl: 'imports/ui/shared/menu-toggle/menu-toggle.view.html',
    link: function (scope, element) {

      var controller = element.parent().controller();

      scope.isOpen = function () {
        return controller.isOpen(scope.section);
      };
      scope.toggle = function () {
        controller.toggleOpen(scope.section);
      };

      var parentNode = element[0].parentNode.parentNode.parentNode;
      if (parentNode.classList.contains('parent-list-item')) {
        var heading = parentNode.querySelector('h2');
        element[0].firstChild.setAttribute('aria-describedby', heading.id);
      }
    }
  };
});