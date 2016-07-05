/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';

import {name as OneReviewAdvertAvito} from './one-review-advert-avito/one-review-advert-avito.component';
import {name as OneReviewAdvertCian} from './one-review-advert-cian/one-review-advert-cian.component';
import {name as OneReviewAdvertIrr} from './one-review-advert-irr/one-review-advert-irr.component';
import {name as OneReviewAdvertYandex} from './one-review-advert-yandex/one-review-advert-yandex.component';

import './one-review-advert.view.html';

class OneReviewAdvert {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {

    $reactive(this).attach($scope);

   }
  
    
}


const moduleName = 'oneReviewAdvert';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  OneReviewAdvertAvito,
  OneReviewAdvertCian,
  OneReviewAdvertIrr,
  OneReviewAdvertYandex
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review-advert/one-review-advert.view.html',
    bindings: {
        realty:'=',
    },
    controllerAs: moduleName,
    controller: OneReviewAdvert
  });

