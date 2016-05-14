/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';
import {saleDescription} from '/imports/api/saleDescription';

import './one-review-desc.view.html';

class OneReviewDesc {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {

    $reactive(this).attach($scope);
    /* Устанавливаем дефолтные значения для всех используемых в компоненте переменных */
    this.saleDescription = saleDescription;
    this.descTitle = this.saleDescription.title;
    this.inputTitleDesc = '';
    this.activeBenefitNumber = 0;
    this.activeBenefitObject;
    this.activeBenefit = {content,label:''};
    this.descDetails = '';
    this.setActiveBenefit();
    this.descTitleNumber = 0;
    this.activeBenefitObjectName = 'Местоположение';
    this.activeBenefitObjectNumber = 0;
    this.benefitsList = ['Местоположение','Жилая комната','Спальная комната','Ванная','Туалеты','Детали отделки','Стены, окна, потолки','Полы','Электричество и освещение','Обогрев, системы кондиционирования','Дополнительные комнаты','Простор, уединение, дополнительные удобства','Цена, оплата','Концовка','Конструкции и сохранность','Участки - только для загородки','Вход','Подвал','Портик, дворик, беседка, веранда, бассейн, гаражи, забор - только для загородки','Крыша']
  }
  
  /* Сохранение описания и заголовка на сервер */
  saveNewDescription (realtyId) {
      this.realty.title = this.inputTitleDesc;
      this.realty.details.descr = this.descDetails;
      Realty.update({_id: realtyId}, {
        $set: this.realty
      }, (error) => {
        if(error) {
          console.log(error)
        } else {
            console.log('Cool!');
        }
      });
  }
  
  /* Выбираем заголовок */
  setDescTitle (description, titleNumber) {
      this.inputTitleDesc = description;
      this.descTitleNumber = titleNumber;
  }
  changeDescTitleNumber (next) {
      if(next){
          if(this.descTitleNumber + 1 >= this.descTitle.length) return false;
          else this.descTitleNumber++;
      }else{
          if(this.descTitleNumber - 1 < 0) return false;
          else this.descTitleNumber--;
      }
      this.inputTitleDesc = this.descTitle[this.descTitleNumber];
  }
  
  /* Выбираем вид выгоды */
  setActiveBenefitObjectNumber(activeBenefitObjectNumber){
      this.activeBenefitObjectNumber = activeBenefitObjectNumber;
      this.activeBenefitObjectName = this.benefitsList[this.activeBenefitObjectNumber];
      this.setActiveBenefit();
  }
  changeActiveBenefitObjectNumber (next) {
      if(next){
          if(this.activeBenefitObjectNumber + 1 >= this.saleDescription.length - 1) return false
          else this.activeBenefitObjectNumber++
      }else{
          if(this.activeBenefitObjectNumber - 1 < 0) return false
          else this.activeBenefitObjectNumber--
      }
      this.activeBenefitObjectName = this.benefitsList[this.activeBenefitObjectNumber];
      this.setActiveBenefit();
  }
  
  /* Устанавливаем описание выбранного вида выгоды */
  setActiveBenefitNumber (activeBenefitNumber) {
      this.activeBenefitNumber = activeBenefitNumber;
      this.activeBenefitContentName = this.benefitsList[activeBenefitNumber];
      console.log(this.activeBenefitNumber);
  }
  changeActiveBenefitNumber (next) {
      if(next){
          if(this.activeBenefitNumber + 1 >= this.saleDescription.length - 1) return false
          else this.activeBenefitNumber++
      }else{
          if(this.activeBenefitNumber - 1 < 0) return false
          else this.activeBenefitNumber--
      }
      console.log(this.activeBenefitNumber);
  }
  
  
  /* Добавляем текст к итоговому описанию */
  addDescDetail () {
      this.descDetails += ' ' + this.activeBenefit.content[this.activeBenefitNumber];
  }
  
  /* Устанавливаем информацию о выбранном виде выгоды */
  setActiveBenefit () {
      switch(this.activeBenefitObjectNumber){
          case 0:
            this.activeBenefit.content = this.saleDescription.place;
            this.activeBenefit.label = 'Местоположение';
            break;
          case 1:
            this.activeBenefit.content = this.saleDescription.liveroom;
            this.activeBenefit.label = 'Жилая комната';
            break;
          case 2:
            this.activeBenefit.content = this.saleDescription.bedroom;
            this.activeBenefit.label = 'Спальная комната';
            break;
          case 3:
            this.activeBenefit.content = this.saleDescription.bathroom;
            this.activeBenefit.label = 'Ванная';
            break;
          case 4:
            this.activeBenefit.content = this.saleDescription.restroom;
            this.activeBenefit.label = 'Туалеты';
            break;
          case 5:
            this.activeBenefit.content = this.saleDescription.renovation;
            this.activeBenefit.label = 'Детали отделки';
            break;
          case 6:
            this.activeBenefit.content = this.saleDescription.sides;
            this.activeBenefit.label = 'Стены, окна, потолки';
            break;
          case 7:
            this.activeBenefit.content = this.saleDescription.floors;
            this.activeBenefit.label = 'Полы';
            break;
          case 8:
            this.activeBenefit.content = this.saleDescription.electricity;
            this.activeBenefit.label = 'Электричество и освещение';
            break;
          case 9:
            this.activeBenefit.content = this.saleDescription.temperature;
            this.activeBenefit.label = 'Обогрев, системы кондиционирования';
            break;
          case 10:
            this.activeBenefit.content = this.saleDescription.addrooms;
            this.activeBenefit.label = 'Дополнительные комнаты';
            break;
          case 11:
            this.activeBenefit.content = this.saleDescription.space;
            this.activeBenefit.label = 'Простор, уединение, дополнительные удобства';
            break;
          case 12:
            this.activeBenefit.content = this.saleDescription.price;
            this.activeBenefit.label = 'Цена, оплата';
            break;
          case 13:
            this.activeBenefit.content = this.saleDescription.end;
            this.activeBenefit.label = 'Концовка';
            break;
          case 14:
            this.activeBenefit.content = this.saleDescription.construction;
            this.activeBenefit.label = 'Конструкции и сохранность';
            break;
          case 15:
            this.activeBenefit.content = this.saleDescription.areas;
            this.activeBenefit.label = 'Участки - только для загородки';
            break;
          case 16:
            this.activeBenefit.content = this.saleDescription.enter;
            this.activeBenefit.label = 'Вход';
            break;
          case 17:
            this.activeBenefit.content = this.saleDescription.basement;
            this.activeBenefit.label = 'Подвал';
            break;
          case 18:
            this.activeBenefit.content = this.saleDescription.lanedetails;
            this.activeBenefit.label = 'Портик, дворик, беседка, веранда, бассейн, гаражи, забор - только для загородки';
            break;
          case 19:
            this.activeBenefit.content = this.saleDescription.roof;
            this.activeBenefit.label = 'Крыша';
            break;
          default:
            this.activeBenefit.content = this.saleDescription.place;
            this.activeBenefit.label = 'place';
            break;
      }
  }
    
}


const moduleName = 'oneReviewDesc';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review-desc/one-review-desc.view.html',
    bindings: {
        realty:'='
    },
    controllerAs: moduleName,
    controller: OneReviewDesc
  });

