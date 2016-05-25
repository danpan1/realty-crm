'use strict';
import angular from 'angular';

const moduleName = 'selectedSubway';

export default angular.module(moduleName, []).filter('selectedSubway',function () {
    /* @ngInject */
    return function (chips, selected) {

        for(var c in chips){
            for(var s in selected){
                if(chips[c] && chips[c]._id == selected[s]){
                    chips.splice(c,1);
                }
            }
        }   
        
        return chips;
    }
});
