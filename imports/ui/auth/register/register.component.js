/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Accounts} from 'meteor/accounts-base';
import {name as PhoneMask} from '/imports/ui/shared/phone-mask/phone-mask.component';
import {Meteor} from 'meteor/meteor';

import './register.view.html';

class Register {
  constructor($scope, $reactive, $state) {
    'ngInject';

    this.$state = $state;

    $reactive(this).attach($scope);

    this.credentials = {
      email: '',
      password: '',
      profile: {
        name: '',
        phone: '',
        surName: '',
        urlVk: ''
      }
    };

    this.error = '';
  }

  filterPhoneKeyPress() {
    if (this.credentials.profile.phone.length >= 17) return false;
    if (this.credentials.profile.phone[0] != '8') this.credentials.profile.phone = '8 ' + this.credentials.profile.phone;
  }

  filterPhoneFocus() {
    if (!this.credentials.profile.phone || this.credentials.profile.phone[0] != '8') this.credentials.profile.phone = '8';
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
          Meteor.call('sendQuestion', {
            phone: this.credentials.profile.phone,
            name: this.credentials.profile.name
          }, (err, res)=>{
            if(err) {console.log(err);}
            else {console.log(res);}
          });
          
          this.$state.go('crm.realty.list.my');
        }
      })
    );
  }
}

const moduleName = 'register';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  PhoneMask
]).component(moduleName, {
  templateUrl: 'imports/ui/auth/register/register.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Register
});
