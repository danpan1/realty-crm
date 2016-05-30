'use strict';
import angular from 'angular';

const moduleName = 'ngPriceFilter';

export default angular.module(moduleName, []).directive('ngPriceFilter',function () {
  return {
    require: 'ngModel',
      link: function(scope, element, attrs, ngModelController) {
        ngModelController.$parsers.push(function(price) {
          var oldNumber = price.split('');
          var number = '';
          for(var i in oldNumber){
            if(oldNumber[i].match(/\d/)){
              number = number + oldNumber[i];
            }
          }
          number = number.split('').reverse().join('');
          number = number.length > 2 ? number.length > 5 ? number.length > 8 ? number.slice(0, 2) + ' ' + number.slice(2,5) +  ' ' + number.slice(5,8) + ' ' + number.slice(8) : number.slice(0, 2) + ' ' + number.slice(2,5) + ' ' + number.slice(5) :  number.slice(0, 2) + ' ' + number.slice(2) : number;
          number = number.split('').reverse().join('');
          return number;
        });
        ngModelController.$formatters.push(function(price) {
          return price; //converted
        });
      }
  }
});



