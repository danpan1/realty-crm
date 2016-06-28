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
    let vm = this;
    this.timeout = $timeout;
    this.stat = 'Ничего нового';
    this.subscribe('users');

    this.helpers({
      operators() {
        let opers = Meteor.users.find({roles : 'operator'});
        return opers;
      }
    });

    Meteor.call('operatorGetStat', (err, result) => {
      if (err) {
        console.log('err: ' + err);
      } else {
        vm.timeout(()=>{
          console.log(result);
          vm.stat = result;
        });
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

