/**
 * Created by Danpan on 01.06.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import './add-role.view.html';

class AddRole {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
  }

  submit() {
    Meteor.call('addRolePaid', Meteor.userId());
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

