/**
 * Created by Danpan on 25.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import {Realty} from '/imports/api/realty';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {dictionary} from '../../../api/dictionary';

import './incoming-call.view.html';

class IncomingCall {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    const vm = this;
    this.dictionary = dictionary;
    vm.perPage = 20;
    vm.page = 1;
    this.street = 'fsdfsdf';
    vm.sort = {
      // 'updated_at': -1
      'parseDetails.UID': -1
    };

    vm.subscribe('incomingCall', () => {
      return [
        //фильтр для pagination
        {
          limit: parseInt(vm.perPage),
          skip: parseInt((vm.getReactively('page') - 1) * vm.perPage),
          sort: vm.getReactively('sort')
        },
        //фильтр клиента
        vm.getReactively('street')
      ];
    }, {
      onReady: function () {
        vm.loaded = true;
      }
    });

    vm.helpers({
      realty: () => {
        return Realty.find({status: 'list'}, {sort: vm.getReactively('sort')});
      },
      realtyCount: () => {
        return Counts.get('realtyCount');
      }
    });
  }

}

const moduleName = 'incomingCall';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/call-center/incoming-call/incoming-call.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: IncomingCall
});
