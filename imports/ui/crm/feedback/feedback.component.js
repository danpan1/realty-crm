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
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    let vm = this;
    this.proposalSent = 0;
    
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        console.log(user);
        this.user = user;
        this.info = {
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
