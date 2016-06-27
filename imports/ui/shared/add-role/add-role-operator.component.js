/**
 * Created by Danpan on 01.06.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import './add-role-operator.view.html';

class AddRoleOperator {
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    $reactive(this).attach($scope);
    this.timeout = $timeout;

    this.subscribe('users');

    this.helpers({
      operators() {
        return Meteor.users.find({roles : 'operator'});
      }
    });
  }

  submit(valid, role) {
    console.log(valid);
    if (valid) {
      if (role === 1) {
        Meteor.call('addUsersToRoleOperator', this.emailAddOperator, true, (err, result) => {
          if (err) {
            this.timeout(()=> {
              this.resultAdd = err;
            }, 0);
          } else {
            this.timeout(()=> {
              this.resultAdd = result;
            }, 0);
          }
        });
      } else if (role === 0) {
        Meteor.call('addUsersToRoleOperator', this.emailRemoveOperator, false, (err, result) => {
          if (err) {
            this.timeout(()=> {
              this.resultRemove = err;
            }, 0);
          } else {
            this.timeout(()=> {
              this.resultRemove = result;
            }, 0);
          }
        });
      }
    }
  }

}

const moduleName = 'addRoleOperator';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/add-role/add-role-operator.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: AddRoleOperator
});

