'use strict';
import angular from 'angular';

const moduleName = 'countFilter';

export default angular.module(moduleName, []).filter('count',function () {
    /* @ngInject */
    return function (num) {
        if (!num) return ''; 
        let str = num.toString() + ' комнат'
        let enging = '';
        switch(num){
            case 1: enging = 'а'; break;
            case 2: case 3: case 4: enging = 'ы'; break;
        }
        str += enging;
        return str;
    }
});
