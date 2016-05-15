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
    this.activeBenefitNumber = 0;
    this.activeBenefitObject;
    this.activeBenefit = {content,label:''};
    this.descDetails = '';
    this.descTitleNumber = 0;
    this.activeBenefitObjectName = 'Местоположение';
    this.activeBenefitObjectNumber = 0;
    this.benefitsList = ['Местоположение','Жилая комната','Спальная комната','Ванная','Туалеты','Детали отделки','Стены, окна, потолки','Полы','Электричество и освещение','Обогрев, системы кондиционирования','Дополнительные комнаты','Простор, уединение, дополнительные удобства','Цена, оплата','Концовка','Конструкции и сохранность','Участки - только для загородки','Вход','Подвал','Портик, дворик, беседка, веранда, бассейн, гаражи, забор - только для загородки','Крыша']
    this.setActiveBenefit();
  }
  
  /* Сохранение описания и заголовка на сервер */
  
  /* Выбираем вид выгоды */
  setActiveBenefitObjectNumber(activeBenefitObjectNumber){
      this.activeBenefitObjectNumber = activeBenefitObjectNumber;
      this.activeBenefitObjectName = this.benefitsList[this.activeBenefitObjectNumber];
      this.setActiveBenefit();
  }
  nextActiveBenefitObjectNumber () {
      if(this.activeBenefitObjectNumber + 1 >= this.saleDescription.length - 1) return false
      else this.activeBenefitObjectNumber++;
      this.activeBenefitObjectName = this.benefitsList[this.activeBenefitObjectNumber];
      this.setActiveBenefit();
  }
  prevActiveBenefitObjectNumber () {
      if(this.activeBenefitObjectNumber - 1 < 0) return false
      else this.activeBenefitObjectNumber--;
      this.activeBenefitObjectName = this.benefitsList[this.activeBenefitObjectNumber];
      this.setActiveBenefit();
  }
  
  /* Устанавливаем описание выбранного вида выгоды */
  setActiveBenefitNumber (activeBenefitNumber) {
      this.activeBenefitNumber = activeBenefitNumber;
      this.activeBenefitContentName = this.benefitsList[activeBenefitNumber];
  }
  nextActiveBenefitNumber () {
      if(this.activeBenefitNumber + 1 >= this.saleDescription.length - 1) return false
      else this.activeBenefitNumber++;
  }
  prevActiveBenefitNumber () {
      if(this.activeBenefitNumber - 1 < 0) return false
      else this.activeBenefitNumber--;
  }
  
  /* Добавляем текст к итоговому описанию */
  addDescDetail () {
      this.descDetails += ' ' + this.activeBenefit.content[this.activeBenefitNumber];
      this.realty.details.descr = this.descDetails;
  }
  
  /* Устанавливаем информацию о выбранном виде выгоды */
  setActiveBenefit () {
      this.activeBenefit.content = this.saleDescription[this.activeBenefitObjectNumber].value;
      this.activeBenefit.label = this.saleDescription[this.activeBenefitObjectNumber].name;
  }
}


const moduleName = 'oneReviewDescContent';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review-desc/one-review-desc-content/one-review-desc-content.view.html',
    bindings: {
        realty:'='
    },
    controllerAs: moduleName,
    controller: OneReviewDescContent
  });

