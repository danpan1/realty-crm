/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Accounts } from 'meteor/accounts-base';
import './resetpw.view.html';

class Resetpw {
  /* @ngInject */
  constructor($scope, $reactive,$state) {
    $reactive(this).attach($scope);
    this.$state = $state;

    this.credentials = {
      email: ''
    };

    this.error = '';
  }

  reset() {
    Accounts.forgotPassword(this.credentials, this.$bindToContext((err, result) => {
      if (err) {
        this.error = err;
        console.log(this.error);
      } else {
        console.log(result);
        this.$state.go('crm.realty.list.new');
      }
    }));
  }
  
}

const moduleName = 'resetpw';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/auth/resetpw/resetpw.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: Resetpw
  });

