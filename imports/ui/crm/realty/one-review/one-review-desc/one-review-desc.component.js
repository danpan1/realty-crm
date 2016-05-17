/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';
import {saleDescription} from '/imports/api/saleDescription';
import {name as OneReviewDescContent} from './one-review-desc-content/one-review-desc-content.component';
import {name as OneReviewDescTitle} from './one-review-desc-title/one-review-desc-title.component';

import './one-review-desc.view.html';

class OneReviewDesc {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {

    $reactive(this).attach($scope);
    /* Устанавливаем дефолтные значения для всех используемых в компоненте переменных */
    this.realty = {title : "1"}
   }
  
    
}


const moduleName = 'oneReviewDesc';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  OneReviewDescContent,
  OneReviewDescTitle
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review-desc/one-review-desc.view.html',
    bindings: {
        realty:'='
    },
    controllerAs: moduleName,
    controller: OneReviewDesc
  });

