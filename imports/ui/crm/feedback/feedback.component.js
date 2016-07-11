/**
 * Created by Danpan on 23.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Email} from 'meteor/email';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

import './feedback.view.html';

class Feedback {
  /* @ngInject */
  constructor($scope, $reactive, $http, $timeout) {
    $reactive(this).attach($scope);
    let vm = this;
    this.timeout = $timeout;
    this.proposalSent = 0;
    this.http = $http;
    
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        console.log(user);
        vm.user = user;
        vm.info = {
            id: user.profile._id,
            topic: '',
            addedinfo: '',
            phone: user.profile.phone,
            username: user.profile.name + ' ' + user.profile.surName,
            useremail: /*user.emails[0].verified ?*/ user.emails[0].address /*: false*/
        }
      }
    });
    
    this.feedbackData = [
      {question:'Какова цена объектов в Океане объектов?',
       answer:`
               Обычные объекты - 60 руб.
               Встреча - 250 руб.
               Платит комиссию - 250 руб.
               Эксклюзив - 2000 руб.
               Встреча + платит комиссию - 400 руб.
               Эксклюзив + Встреча - 2100 руб.
               Эксклюзив + Платит комиссию - 2100 руб.
               Эксклюзив + Платит комиссию + Встреча - 2200 руб.
               `
      },
      {question:'Контакты организации',
       answer:`
               ИП Мурыгин Александр Иванович
               ИНН 503199439647
               ОГРН/ОГРНИП 313503114900040
               Юридический адрес 142402, РОССИЯ, обл. Московская, р-н. Ногинский, г. Ногинск, ул.Ильича, д.81, кв.137
               Фактический адрес 142402, РОССИЯ, обл. Московская, р-н. Ногинский, г. Ногинск, ул.Ильича, д.81, кв.137
               Контактный телефон: +7(925) 075-95-87
               `      
      }
    ]
  }
  
  testAmoAuth () {
    Meteor.call('amoCrmAuth', this.info, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        this.timeout(()=>{
          console.log(result);
        },100)
      }
    });
  }
  
  testGetResponse (action) {
    Meteor.call('getResponseTest', action, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        this.timeout(()=>{
          console.log(result);
        },100)
      }
    });
  }
  
  testAmoTest () {
    Meteor.call('amoCrmTest', this.info, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          this.timeout(()=>{
            console.log(result);
          },100)
        }
      });
  }
  
  testAmoUnsort () {
    Meteor.call('amoCrmUnsort', this.info, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        this.timeout(()=>{
          console.log(result);
        },100)
      }
    });
  }
  
  testAmoNewContact () {
    Meteor.call('amoCrmNewContact', this.info, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          this.timeout(()=>{
            console.log(result);
          },100)
        }
      });
  }
  
  testAmoNewDeal () {
    Meteor.call('amoCrmNewDeal', this.info, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        this.timeout(()=>{
          console.log(result);
        },100)
      }
    });
  }
  /*
  testRoboKassa () {
    Meteor.call('roboKassaTest', this.info, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          this.timeout(()=>{
            console.log(result);
          },100)
        }
      });
  }
  */
  /*send () {
    if(this.proposalSent == 0){
      this.proposalSent = 1;
      Meteor.call('sendQuestion', this.info, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Cool!`);
          this.timeout(()=>{
            this.proposalSent = 2;
          },0)
          this.timeout(()=>{
            this.proposalSent = 0;
          },3000)
        }
      });
    }
  }*/
  
  /***  Metrics experiments ***/
  /*someEvent () {
    Meteor.call('metrics', (error, result)=> {

      if (error) {
        console.log('error', error);
      } else {
        console.log(result);
        result.openRegistrationModal();
      }

    });
  }*/
  
}

const moduleName = 'feedback';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/feedback/feedback.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Feedback
})
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('crm.feedback', {
      url: '/feedback',
      template: '<feedback/>'
    });
}
