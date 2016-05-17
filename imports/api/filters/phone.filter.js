'use strict';
import angular from 'angular';

const moduleName = 'phoneFilter';

export default angular.module(moduleName, []).filter('phone',function () {
    /* @ngInject */
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');
        var country, city, number, main;
        country = value[0];
        city = value.slice(1, 4);
        number = value.slice(4);

        main = city ? city.length >= 3 ? (country + ' (' + city + ') ') : (country + ' (' + city) : country;
        number = number ? number.length > 3 ? number.length > 5 ? number.slice(0, 3) + '-' + number.slice(3,5) + '-' + number.slice(5) :  number.slice(0, 3) + '-' + number.slice(3) : number : '';

        return (main + number).trim();
    }
});
