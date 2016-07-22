/**
 * Created by Danpan on 01.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import './login.view.html';

class Login {
  /* @ngInject */
  constructor($scope, $reactive, $state) {
    this.$state = $state;

    $reactive(this).attach($scope);

    this.credentials = {
      email: '',
      password: ''
    };

    this.error = '';
  }

  login() {
    Meteor.loginWithPassword(this.credentials.email, this.credentials.password,
      this.$bindToContext((err, res) => {
        if (err) {
          this.error = 'Неверно указан Email или пароль';
        } else {
          console.log('loginSuccess', res);

          Meteor.call('checkPhoto', this.credentials.email, (error, isPhoto) => {
            if (error) console.log(error);
            else {
              if (isPhoto == true) this.$state.go('auth.change-photo');
              else this.$state.go('crm.realty.list.my');
            }
          })

        }
      })
    );
  }
}
const moduleName = 'login';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/auth/login/login.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Login
})