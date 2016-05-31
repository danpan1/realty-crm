'use strict';
import angular from 'angular';

const moduleName = 'ngPhoneFilter';

export default angular.module(moduleName, []).directive('ngPhoneFilter',function () {
  return {
    require: 'ngModel',
      link: function(scope, element, attrs, ngModelController) {
          
        ngModelController.$parsers.push(function(tel) {
          if(!tel) return tel;
            let oldValue = tel.split('');
            let value = [];
            for(var i in oldValue){
                if(oldValue[i].match(/\d/)){
                    value.push(oldValue[i]);
                }
            }
			if(value[0] == '8') {
                value.splice(0,1);
            }
            value = value.join('');
            var city = value.slice(0, 3);
            var number = value.slice(3);
            city = city ? city.length >= 3 ? ' (' + city + ') ' : city : '';
            number = number ? number.length > 3 ? number.length > 5 ? number.slice(0, 3) + '-' + number.slice(3,5) + '-' + number.slice(5) :  number.slice(0, 3) + '-' + number.slice(3) : number : '';
            return (' ' + city + number).trim();
        });
        
        ngModelController.$formatters.push(function(data) {
          return data; 
        });
        
      }
  }
});