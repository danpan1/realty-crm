/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';
import {saleDescription, saleTitle} from '/imports/api/saleDescription';

import './one-review-desc-title.view.html';

class OneReviewDescTitle {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {

    $reactive(this).attach($scope);
    /* Устанавливаем дефолтные значения для всех используемых в компоненте переменных */
    this.saleDescription = saleDescription;
    this.descTitle = saleTitle;
    this.inputTitleDesc = 'a';
    this.descTitleNumber = undefined;
  }
  
  setSomeTitle () {
      var vm = this;
      vm.inputTitleDesc = vm.realty.title;
  }
  onInit () {
      var vm = this;
      setTimeout( () => {
        vm.setSomeTitle();
      },1500);
  }
  
  /* Выбираем заголовок */
  setDescTitle (description, titleNumber) {
      this.inputTitleDesc = description;
      this.descTitleNumber = titleNumber;
      this.realty.title = this.inputTitleDesc;
  }
  nextDescTitleNumber () {
      if(this.descTitleNumber == undefined) this.descTitleNumber = 0;
      else this.descTitleNumber++;
      this.inputTitleDesc = this.descTitle.value[this.descTitleNumber];
      this.realty.title = this.inputTitleDesc;
  }
  prevDescTitleNumber (){
      this.descTitleNumber--;
      this.inputTitleDesc = this.descTitle.value[this.descTitleNumber];
      this.realty.title = this.inputTitleDesc;
  }
  
  controlKeyPress (text) {
      if(text){
        this.realty.title = text;
      }
  }
  
}

const moduleName = 'oneReviewDescTitle';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review-desc/one-review-desc-title/one-review-desc-title.view.html',
    bindings: {
        realty:'=ngModel'
    },
    controllerAs: moduleName,
    controller: OneReviewDescTitle
  });

