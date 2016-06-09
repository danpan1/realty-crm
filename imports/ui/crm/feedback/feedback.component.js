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
  }
  
  send () {
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
  }
  
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
