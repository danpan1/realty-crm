/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Accounts} from 'meteor/accounts-base';

import './register.view.html';

class Register {
  constructor($scope, $reactive, $state) {
    'ngInject';

    this.$state = $state;

    $reactive(this).attach($scope);

    this.credentials = {
      email: '',
      password: '',
      profile:{
        name: '',
        phone: '',
        surName: '',
        urlVk: ''
      }
    };

    this.error = '';
  }

  register() {
    console.log(this.credentials);
    Accounts.createUser(this.credentials,
      this.$bindToContext((err) => {
        if (err) {
          this.error = err;
        } else {
          this.$state.go('crm.realty.list.my');
        }
      })
    );
  }
}

const moduleName = 'register';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/auth/register/register.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Register
});
