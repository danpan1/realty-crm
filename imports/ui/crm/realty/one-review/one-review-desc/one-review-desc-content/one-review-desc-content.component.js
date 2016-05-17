/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';
import {saleDescription} from '/imports/api/saleDescription';

import './one-review-desc-content.view.html';

class OneReviewDescContent {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {

    $reactive(this).attach($scope);
    /* Устанавливаем дефолтные значения для всех используемых в компоненте переменных */
    this.saleDescription = saleDescription;
    this.active = {
        index:-1,
        content:''
    };
    this.activeBenefit = {content,label:''};
    this.activeObject = {
        object:'',
        name:undefined,
        index:undefined
    };
    this.desc = {
        details: '',
        nextdetails: '',
        descTitleNumber: 0
    }
    this.compareLength = 0;
    this.descTitleNumber = 0;
    this.benefitsList = saleDescription.map((item)=> {return item.name})
    this.textVariable = "";
    this.setActiveBenefit();
  }
  
  
  setSomeDesc () {
      var vm = this;
      vm.desc.details = vm.realty.details.descr;
  }
  
  onInit () {
      var vm = this;
      setTimeout( () => {
        vm.setSomeDesc();
      },1500);
  }
  /* Сохранение описания и заголовка на сервер */
  
  /* Выбираем вид выгоды */
  setActiveBenefitObjectNumber(activeNumber){
      if(activeNumber){
        this.activeObject.index = activeNumber;
      }
      this.activeObject.name = this.benefitsList[this.activeObject.index];
      if(this.desc.nextdetails.length != this.compareLength) this.addDescDetail();
      this.setActiveBenefit();
  }
  nextActiveBenefitObjectNumber () {
      if(this.activeObject.index == undefined) this.activeObject.index = 0;
      else this.activeObject.index++;
      this.setActiveBenefitObjectNumber();
  }
  prevActiveBenefitObjectNumber () {
      this.activeObject.index--;
      this.setActiveBenefitObjectNumber();
  }
  
  /* Устанавливаем описание выбранного вида выгоды */
  setActiveBenefitNumber (activeNumber) {
      if(activeNumber) this.active.index = activeNumber;
      this.textVariable = this.activeBenefit.content[this.active.index] ? this.activeBenefit.content[this.active.index] : '';
      this.desc.details = this.desc.nextdetails + this.textVariable;
      this.compareLength = this.desc.details.length;
  }
  nextActiveBenefitNumber () {
      this.active.index++;
      this.setActiveBenefitNumber();
  }
  prevActiveBenefitNumber () {
      this.active.index--;
      this.setActiveBenefitNumber();
  }
  
  /* Добавляем текст к итоговому описанию */
  addDescDetail () {
      this.realty.details.descr = this.desc.details;
      this.desc.nextdetails = this.desc.details + ' ';
     // this.textVariable = this.activeBenefit.content[this.active.index] ? this.activeBenefit.content[this.active.index] : '';
      this.desc.details = this.desc.nextdetails + this.textVariable;
      this.compareLength = this.desc.nextdetails.length;
  }
  
  /* Устанавливаем информацию о выбранном виде выгоды */
  setActiveBenefit () {
      if(this.activeObject.index != undefined){
          this.activeBenefit.content = this.saleDescription[this.activeObject.index].value;
          this.activeBenefit.label = this.saleDescription[this.activeObject.index].name;
          this.textVariable = '';
          this.desc.details = this.desc.nextdetails + this.textVariable;
          this.active.index = -1;
      }
  }
  
  /* Просто отслеживаем, что пользователь что-то нажал в textarea, значит, нужно это сохранить */
  controlKeyPress (text) {
      if(text){
        this.compareLength = text.length;
        this.realty.details.descr = text;
      }
  }
}


const moduleName = 'oneReviewDescContent';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review-desc/one-review-desc-content/one-review-desc-content.view.html',
    bindings: {
        realty:'=ngModel'
    },
    controllerAs: moduleName,
    controller: OneReviewDescContent
  });

