'use strict';
import angular from 'angular';

const moduleName = 'ngPriceFilter';

export default angular.module(moduleName, []).directive('ngPriceFilter',function () {
  return {
    require: 'ngModel',
      link: function(scope, element, attrs, ngModelController) {
        ngModelController.$parsers.push(function(price) {
            if (!price) return ''; 
            var number = price.split('');
            for(var i in [1,2,3]){
              for (var i in number) {
                if(number[i] == ' ') {
                	number.splice(i,1);
                }
              }
            }
            number = number.reverse().join('');
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



/*angular.module("app", []);

angular.module("app").controller("ctrl", function($scope){
    $scope.item = '';
    $scope.$watch('item', function(newVal, oldVal){
        if (newVal !== oldVal){
        }
    });
});

angular.module("app").directive("myDirective", function(){
   return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelController) {
        ngModelController.$parsers.push(function(tel) {
          if(!tel) return tel;
            var value = tel.split('');
						if(value[0]=='&')value = value.splice(1,2);
            for(var i in value){
                if(value[i].match(/\(/)){
                		console.log(value[i]);
                    value.splice(i,1);
                }
                if(value[i].match(/\)/)){
                    value.splice(i,1);
                }
                if(value[i].match(/\+|\(|\)|\-|\s/)){
                    value.splice(i,1);
                }
            }
            value = value.join('');
            var country, city, number, main;
            country = value[0];
            city = value.slice(1, 4);
            number = value.slice(4);
            city = city ? city.length >= 3 ? '(' + city + ')' : ' ' + city : '';
            number = number ? number.length > 3 ? number.length > 5 ? ' ' + number.slice(0, 3) + '-' + number.slice(3,5) + '-' + number.slice(5) : ' ' +  number.slice(0, 3) + '-' + number.slice(3) : ' ' +  number : '';
            return (country + city + number).trim();
        });
    
        ngModelController.$formatters.push(function(data) {
          return data; //converted
        });
      }
    };
});*/