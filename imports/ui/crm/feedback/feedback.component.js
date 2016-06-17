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
      {question:'Вопрос 1',
       answer:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro voluptas culpa magnam nesciunt vitae est reiciendis ipsam accusantium rerum eveniet velit voluptatum voluptate, dignissimos, beatae asperiores distinctio provident nam dolores, unde delectus. Explicabo saepe nobis commodi perferendis dolorum excepturi asperiores, culpa ipsa quae illum, quo fuga doloribus nihil amet omnis consequatur. Necessitatibus, dicta illo vitae architecto expedita nulla omnis sapiente dolorem beatae numquam provident porro, accusantium nihil dolores tenetur dolor aut itaque a modi voluptatibus. Vel labore quis iure, velit vitae dolorem sit, quae dolorum unde deleniti cumque molestiae accusantium tenetur, ipsum laudantium! Minus necessitatibus vero, ullam? Culpa, distinctio, eos!'
      },
      {question:'Вопрос 2',
       answer:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro voluptas culpa magnam nesciunt vitae est reiciendis ipsam accusantium rerum eveniet velit voluptatum voluptate, dignissimos, beatae asperiores distinctio provident nam dolores, unde delectus. Explicabo saepe nobis commodi perferendis dolorum excepturi asperiores, culpa ipsa quae illum, quo fuga doloribus nihil amet omnis consequatur. Necessitatibus, dicta illo vitae architecto expedita nulla omnis sapiente dolorem beatae numquam provident porro, accusantium nihil dolores tenetur dolor aut itaque a modi voluptatibus. Vel labore quis iure, velit vitae dolorem sit, quae dolorum unde deleniti cumque molestiae accusantium tenetur, ipsum laudantium! Minus necessitatibus vero, ullam? Culpa, distinctio, eos!'
      },
      {question:'Вопрос 3',
       answer:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro voluptas culpa magnam nesciunt vitae est reiciendis ipsam accusantium rerum eveniet velit voluptatum voluptate, dignissimos, beatae asperiores distinctio provident nam dolores, unde delectus. Explicabo saepe nobis commodi perferendis dolorum excepturi asperiores, culpa ipsa quae illum, quo fuga doloribus nihil amet omnis consequatur. Necessitatibus, dicta illo vitae architecto expedita nulla omnis sapiente dolorem beatae numquam provident porro, accusantium nihil dolores tenetur dolor aut itaque a modi voluptatibus. Vel labore quis iure, velit vitae dolorem sit, quae dolorum unde deleniti cumque molestiae accusantium tenetur, ipsum laudantium! Minus necessitatibus vero, ullam? Culpa, distinctio, eos!'
      },
      {question:'Вопрос 4',
       answer:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro voluptas culpa magnam nesciunt vitae est reiciendis ipsam accusantium rerum eveniet velit voluptatum voluptate, dignissimos, beatae asperiores distinctio provident nam dolores, unde delectus. Explicabo saepe nobis commodi perferendis dolorum excepturi asperiores, culpa ipsa quae illum, quo fuga doloribus nihil amet omnis consequatur. Necessitatibus, dicta illo vitae architecto expedita nulla omnis sapiente dolorem beatae numquam provident porro, accusantium nihil dolores tenetur dolor aut itaque a modi voluptatibus. Vel labore quis iure, velit vitae dolorem sit, quae dolorum unde deleniti cumque molestiae accusantium tenetur, ipsum laudantium! Minus necessitatibus vero, ullam? Culpa, distinctio, eos!'
      },
      {question:'Вопрос 5',
       answer:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro voluptas culpa magnam nesciunt vitae est reiciendis ipsam accusantium rerum eveniet velit voluptatum voluptate, dignissimos, beatae asperiores distinctio provident nam dolores, unde delectus. Explicabo saepe nobis commodi perferendis dolorum excepturi asperiores, culpa ipsa quae illum, quo fuga doloribus nihil amet omnis consequatur. Necessitatibus, dicta illo vitae architecto expedita nulla omnis sapiente dolorem beatae numquam provident porro, accusantium nihil dolores tenetur dolor aut itaque a modi voluptatibus. Vel labore quis iure, velit vitae dolorem sit, quae dolorum unde deleniti cumque molestiae accusantium tenetur, ipsum laudantium! Minus necessitatibus vero, ullam? Culpa, distinctio, eos!'
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
