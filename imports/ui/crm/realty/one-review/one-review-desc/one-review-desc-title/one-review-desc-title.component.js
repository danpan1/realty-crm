/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';
import {saleDescription} from '/imports/api/saleDescription';

import './one-review-desc-title.view.html';

class OneReviewDescTitle {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {

    $reactive(this).attach($scope);
    /* Устанавливаем дефолтные значения для всех используемых в компоненте переменных */
    this.saleDescription = saleDescription;
    this.descTitle = this.saleDescription[0].value;
    this.descTitleNumber = 0;
    this.inputTitleDesc = '';
  }
  
  /* Выбираем заголовок */
  setDescTitle (description, titleNumber) {
      this.inputTitleDesc = description;
      this.descTitleNumber = titleNumber;
      this.realty.title = this.inputTitleDesc;
  }
  nextDescTitleNumber () {
      if(this.descTitleNumber + 1 >= this.descTitle.length) return false;
      else this.descTitleNumber++;
      this.inputTitleDesc = this.descTitle[this.descTitleNumber];
      this.realty.title = this.inputTitleDesc;
  }
  prevDescTitleNumber (){
      if(this.descTitleNumber - 1 < 0) return false;
      else this.descTitleNumber--;
      this.inputTitleDesc = this.descTitle[this.descTitleNumber];
      this.realty.title = this.inputTitleDesc;
  }
}

const moduleName = 'oneReviewDescTitle';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review-desc/one-review-desc-title/one-review-desc-title.view.html',
    bindings: {
        realty:'='
    },
    controllerAs: moduleName,
    controller: OneReviewDescTitle
  });

