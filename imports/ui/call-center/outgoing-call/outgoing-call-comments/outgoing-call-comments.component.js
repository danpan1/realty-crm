/**
 * Created by  Danpan on 25.04.16.
 */
import angular from 'angular';
import {Meteor} from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import {dictionary} from '/imports/helpers/dictionary';
import './outgoing-call-comments.view.html';

class OutgoingCallComments {
  /* @ngInject */
  constructor($scope, $reactive, $timeout, $state) {
    $reactive(this).attach($scope);
    let vm = this;
    this.dictionary = dictionary;
  }

  signLamp (phone, id) {
    this.removeRealty(id);
  }

  removeRealty (id) {
    console.log('remove '+id)
    Meteor.call('removeRealty', id, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        this.getNew();
      }
    });
  }

}

const moduleName = 'outgoingCallComments';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/call-center/outgoing-call/outgoing-call-comments/outgoing-call-comments.view.html',
  bindings: {
    getNew: '&',
    realty: '='
  },
  controllerAs: moduleName,
  controller: OutgoingCallComments
})