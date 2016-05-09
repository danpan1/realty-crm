/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../../api/dictionary';
import {Realty} from '/imports/api/realty';

import './one-info.view.html';

class OneInfo {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.subscribe('oneInfo', () => {
      return [
        $stateParams.realtyId
      ];
    }, {
      onReady(){
        let realty = Realty.findOne({});
      }
    });

    this.helpers({
      realty: () => {
        return Realty.findOne({});
      }
    });
    // oneInfo

    this.slideNum = 0;

  }

  nextImage(boo, max) {
    if (boo) {
      if (this.slideNum + 1 >= max) {
        this.slideNum = 0;
      }
      else {
        this.slideNum++;
      }
    } else {
      if (this.slideNum - 1 <= 0) {
        this.slideNum = max - 1;
      }
      else {
        this.slideNum--;
      }
    }
  }
}

const moduleName = 'oneInfo';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/one-info/one-info.view.html',
  bindings: {
    /*
     realty: '='
     */
  },
  controllerAs: moduleName,
  controller: OneInfo
});

