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
  constructor($scope, $reactive, $http) {
    $reactive(this).attach($scope);
    let vm = this;
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
        vm.data = {
            good_name: "ocaen_object_6mes",
            bill_first_name: user.profile.name,
            bill_email: user.emails[0].address,
            bill_phone: user.profile.phone,
            file_profile: "default",
            offerta_accept: "true"
        };
      }
    });
    
  }
  
  send () {
      let vm = this;
      vm.proposalSent = 1;
      Meteor.call('sendQuestion', vm.info, (error, result) => {
          if (error) {
              console.log(error);
          } else {
              console.log(`Cool!`);
              vm.proposalSent = 2;
          }
      });
  }
  
  someEvent () {
    Meteor.call('metrics', (error, result)=> {

      if (error) {
        console.log('error', error);
      } else {
        console.log(result);
        result.openRegistrationModal();
      }

    });
  }
  
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
