'use strict';
import angular from 'angular';

const moduleName = 'ngPhoneFilter';

export default angular.module(moduleName, []).directive('ngPhoneFilter',function () {
  return {
    require: 'ngModel',
      link: function(scope, element, attrs, ngModelController) {
        ngModelController.$parsers.push(function(tel) {
          if(!tel) return tel;
            var value = tel.split('');
			if(value[0]=='&')value = value.splice(1,2);
            for(var i in [1,2,3]){
              for(var i in value){
                  if(value[i].match(/\+|\(|\)|\-|\s|d/)){
                      value.splice(i,1);
                  }
              }
            }
			if(value[0] == '7') value.splice(0,1);
            value = value.join('');
            var city, number, main;
            city = value.slice(0, 3);
            number = value.slice(3);
            city = city ? city.length >= 3 ? ' (' + city + ') ' : city : '';
            number = number ? number.length > 3 ? number.length > 5 ? number.slice(0, 3) + '-' + number.slice(3,5) + '-' + number.slice(5) :  number.slice(0, 3) + '-' + number.slice(3) : number : '';
            console.log(city + number);
            return (' ' + city + number).trim();
        });
    
        ngModelController.$formatters.push(function(data) {
          return data; //converted
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