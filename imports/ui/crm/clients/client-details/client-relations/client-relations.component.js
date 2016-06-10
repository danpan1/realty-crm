/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Realty} from '/imports/api/realty';
import {Clients} from '/imports/api/clients';
import {Counts} from 'meteor/tmeasday:publish-counts';

import './client-relations.view.html';

class ClientRelations {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
    var vm = this;
    
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        vm.user = user;
      }
    });
    
    vm.assort = $stateParams.assort ? $stateParams.assort : 'manual';
    this.client = Clients.findOne({_id: $stateParams.client});
    vm.selectedTab = '';
    switch ($stateParams.assort) {
      case 'manual':
        vm.selectedTab = 0;
        break;
      case 'auto':
        vm.selectedTab = 1;
        break;
      default:
        vm.selectedTab = 0;
    }

    vm.perPage = 5;
    vm.page = 1;
    this.showSlider = false;
    this.slideShowImages = [];
    vm.sort = {
      '_id': -1
    };

    vm.subscribe('relationsListInClient', () => {
      return [
        //фильтр для pagination
        {
          limit: parseInt(vm.perPage),
          skip: parseInt((vm.getReactively('page') - 1) * vm.perPage),
          sort: vm.getReactively('sort')
        }, {
          my: vm.getReactively('client.relations.my'),
          saved: vm.getReactively('client.relations.saved'),
          offers: vm.getReactively('client.relations.offers'),
          new: vm.getReactively('client.relations.new'),
          hide: vm.getReactively('client.relations.hide')
        }
      ];
    }, {
      onReady: function () {
        vm.loaded = true;
      }
    });


    vm.helpers({
      client: () => {
        return Clients.findOne({_id: $stateParams.client});
      },
      realtyNew() {
        if (vm.client && vm.client.relations) {
          return Realty.find({_id: {$in: vm.getReactively('client.relations.new') || []}}, {sort: vm.getReactively('sort')});
        } else {
          return [];
        }
      },
      realtyOffers() {
        if (vm.client && vm.client.relations) {
          return Realty.find({_id: {$in: vm.getReactively('client.relations.offers') || []}}, {sort: vm.getReactively('sort')});
        } else {
          return [];
        }
      },
      realtySaved() {
        if (vm.client && vm.client.relations) {
          return Realty.find({_id: {$in: vm.getReactively('client.relations.saved') || []}}, {sort: vm.getReactively('sort')});
        } else {
          return [];
        }
      },
      realtyMy() {
        console.log('realty.my');
        if (vm.client && vm.client.relations) {
          console.log('realty.m222y');
          return Realty.find({_id: {$in: vm.getReactively('client.relations.my') || []}}, {sort: vm.getReactively('sort')});
        } else {
          return [];
        }
      },
      realtyCount: () => {
        return Counts.get('realtyCount');
      }
    });

  }

  setSliderImages(images) {
    // console.log(images);
    if (images && images.length) {
      this.showSlider = true;
      this.slideShowImages = images;
    }
  }

}

const moduleName = 'clientRelations';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-relations/client-relations.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientRelations
});

