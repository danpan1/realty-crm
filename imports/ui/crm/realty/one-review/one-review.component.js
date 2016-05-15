/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';
import {Realty} from '/imports/api/realty';
import {name as OneReviewDesc} from './one-review-desc/one-review-desc.component';

import './one-review.view.html';

class OneReview {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {

    $reactive(this).attach($scope);

    let vm = this;

    this.subscribe('oneInfo',() => {
      return [
        $stateParams.realtyId
      ];
    }, {
      onReady() {
        vm.realty = Realty.findOne({});
        vm.prepareRealty();
      }
    });

    this.helpers({
      realty: () => {
        return Realty.findOne({});
      }
    });

  }

  prepareRealty() {}

  
  /* Сохранение описания и заголовка на сервер */
  saveNewDescription (realtyId) {
      Realty.update({_id: realtyId}, {
        $set: this.realty
      }, (error) => {
        if(error) {
          console.log(error)
        } else {
            console.log('Description updated!');
        }
      });
  }
  
}

const moduleName = 'oneReview';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  OneReviewDesc
]).component(moduleName, {
    templateUrl: 'imports/ui/crm/realty/one-review/one-review.view.html',
    bindings: {},
    controllerAs: moduleName,
    controller: OneReview
  });

