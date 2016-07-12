/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';

import './one-review-advert-avito.view.html';

class OneReviewAdvertAvito {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {

    $reactive(this).attach($scope);
    this.params = {
      premium: false,
      vip:false,
      select:false,
      up: false,
      turbo:true,
      noSetOff:true,
      longTime:true
    }
  }

}


const moduleName = 'oneReviewAdvertAvito';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review-advert/one-review-advert-avito/one-review-advert-avito.view.html',
    bindings: {
        ischeckout:'=',
        savereview:'&'
    },
    controllerAs: moduleName,
    controller: OneReviewAdvertAvito
  });

