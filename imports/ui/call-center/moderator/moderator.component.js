/**
 * Created by Danpan on 11.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import './moderator.view.html';

class Moderator {
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    this.$timeout = $timeout;
    $reactive(this).attach($scope);
    // console.log('mode');
    this.getNew();
  }

  getNew() {
    this.isLoading = true;
    const vm = this;
    Meteor.call('moderatorGet', (error, result)=> {
      if (error) {
        console.log('error', error);
      } else {
        this.$timeout(()=> {
          vm.realty = result;
          vm.isLoading = false;
          console.log('новый объект', vm.realty);
          if (!result) {
            vm.isLoading = true;
          }
        });
      }
    });
  }

  save(approved) {
    this.realty.moderator.status = 'done';
    //Если одобрил модератор то размещается на доске объявлений
    if (approved) {
      this.realty.status = 'sale';
    }
    Meteor.call('moderatorSave', this.realty, (error)=> {
      if (error) {
        console.log('error', error);
      } else {
        this.getNew();
      }
    });
  }

}

const moduleName = 'moderator';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/call-center/moderator/moderator.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Moderator
});
