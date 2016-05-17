'use strict';
import angular from 'angular';

const moduleName = 'priceFilter';

export default angular.module(moduleName, []).filter('price',function () {
    /* @ngInject */
    return function (price) {
        if (!price) return ''; 
        var number = price.toString();
        number = number.split('').reverse().join('');
        number = number.length > 3 ? number.length > 6 ? number.length > 6 ? number.slice(0, 3) + ' ' + number.slice(3,6) +  ' ' + number.slice(6,9) + ' ' + number.slice(9) : number.slice(0, 3) + ' ' + number.slice(3,6) + ' ' + number.slice(6) :  number.slice(0, 3) + ' ' + number.slice(3) : number;
        number = number.split('').reverse().join('');
        return number;
    }
});
