/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Accounts} from 'meteor/accounts-base';
import {name as PhoneMask} from '/imports/ui/shared/phone-mask/phone-mask.component';
import {Meteor} from 'meteor/meteor';

import './change-photo.view.html';

class ChangePhoto {
  constructor($scope, $reactive, $state) {
    'ngInject';
    $reactive(this).attach($scope);
    this.$state = $state;
    let vm = this;
    
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        vm.user = user;
      }
    });

  }

  changeSubways () {
    Meteor.call('changePhotoSubways', this.user._id, this.user.profile.subways,  (err, res) => {
      if (err) {console.log(err);}
      else {
        console.log('OK!', res);
      }
    });
  }
  
}

const moduleName = 'changePhoto';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  PhoneMask
]).component(moduleName, {
  templateUrl: 'imports/ui/auth/change-photo/change-photo.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ChangePhoto
});
