/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import './one-review-photo-list.view.html';

class OneReviewPhotoList {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams, $timeout) {

    $reactive(this).attach($scope);
    let vm = this;
    this.$timeout = $timeout;
    
    this.subscribe('photographers');

    this.helpers({
      photographers() {
        return Meteor.users.find({'profile.photo' : true});
      }
    });

   }
   
}

const moduleName = 'oneReviewPhotoList';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review-photo/one-review-photo-list/one-review-photo-list.view.html',
    bindings: {
        realty:'=',
        savereview:'&',
        thumbcontrol:'=',
        imagecontrol:'='
    },
    controllerAs: moduleName,
    controller: OneReviewPhotoList
  });

