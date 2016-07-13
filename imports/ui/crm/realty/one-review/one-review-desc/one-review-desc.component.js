/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';
import {saleDescription} from '/imports/helpers/saleDescription';
import {name as OneReviewDescContent} from './one-review-desc-content/one-review-desc-content.component';
import {name as OneReviewDescTitle} from './one-review-desc-title/one-review-desc-title.component';

import './one-review-desc.view.html';

class OneReviewDesc {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams, $timeout) {
    this.$timeout = $timeout;
    $reactive(this).attach($scope);
    /* Устанавливаем дефолтные значения для всех используемых в компоненте переменных */
   }
  
    saveReviewDesc () {
      this.saveReview({id:this.realty._id});
      this.descriptionSaved = true;
      this.$timeout(()=> {
        this.descriptionSaved = false;
      }, 3000)
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
        realty:'=',
        saveReview: '&'
    },
    controllerAs: moduleName,
    controller: OneReviewDesc
  });

