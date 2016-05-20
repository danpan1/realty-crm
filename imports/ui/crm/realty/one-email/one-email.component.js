/**
 * Created by Danpan on 09.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Email} from 'meteor/email';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';

import './one-email.view.html';

class OneEmail {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
    let vm = this;
    
    this.subscribe('oneInfo', () => {
      return [
        $stateParams.realtyId
      ];
    }, {
      onReady() {
        vm.realty = Realty.findOne({});
      }
    });
    
    this.info = {
        emails:'',
        topic: '',
        addedinfo: '',
        dealcondition: '',
        partnerpercent: ''
    }
  }
  
  send () {
      Meteor.call('sendTest', this.info, this.realty, (error, result) => {
          if (error) {
              console.log(error);
          } else {
              console.log(`Cool!`);
          }
      });
  }

}

const moduleName = 'oneEmail';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-email/one-email.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: OneEmail
  });
