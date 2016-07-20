/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Accounts} from 'meteor/accounts-base';
import {name as PhoneMask} from '/imports/ui/shared/phone-mask/phone-mask.component';
import {Meteor} from 'meteor/meteor';

import './register-photo.view.html';

class RegisterPhoto {
  constructor($scope, $reactive, $state) {
    'ngInject';

    this.$state = $state;

    $reactive(this).attach($scope);

    this.credentials = {
      email: '',
      password: '',
      profile: {
        photo: true,
        name: '',
        phone: '',
        surName: '',
        urlVk: '',
        subways: {
          list: [],
          embedded: []
        }
      },
      roles:['photo']
    };

    this.error = '';
  }

  register() {

    var value = this.credentials.profile.phone.split('');
    for (var i in [1, 2, 3]) {
      for (var i in value) {
        if (value[i].match(/\+|\(|\)|\-|\s|d/)) {
          value.splice(i, 1);
        }
      }
    }
    this.credentials.profile.phone = value.join('');
    console.log(this.credentials);
    Accounts.createUser(this.credentials,
      this.$bindToContext((err, createUserResult) => {
        if (err) {
          if (err.reason == 'Phone is required') this.error = 1;
          else if (err.reason == 'Email already exists.') this.error = 2;
          else this.error = 3;
        } else {
          /*
          Meteor.call('addUsersToRolePhoto', this.credentials.profile.email, (err, res) => {
            if (err) {console.log(err);}
            else {
              console.log('OK!', res);
            }
          });
          */
          this.$state.go('auth.change-photo');
        }
      })
    );
  }
}

const moduleName = 'registerPhoto';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  PhoneMask
]).component(moduleName, {
  templateUrl: 'imports/ui/auth/register-photo/register-photo.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: RegisterPhoto
});
