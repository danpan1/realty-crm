/**
 * Created by Danpan on 01.06.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import './add-role.view.html';

class AddRole {
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    $reactive(this).attach($scope);
    this.timeout = $timeout;

    this.subscribe('users');

    this.helpers({
      students() {
        return Meteor.users.find({roles : 'couching'});
      },
      users() {
        return Meteor.users.find({});
      }
    });
  }
  
  submitCouching(valid) {
    console.log(valid);
    if (valid) {
      Meteor.call('addUsersToRoleCouching', this.studentEmail, (err, result)=> {
        if (err) {
          this.timeout(()=> {
            this.resultSale = err;
          }, 0);
        } else {
          this.timeout(()=> {
            this.resultSale = result;
          }, 0);
        }
      });
    }
  }

}

const moduleName = 'addRole';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/add-role/add-role.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: AddRole
});

