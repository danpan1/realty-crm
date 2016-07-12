import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Realty} from '/imports/api/realty';
import {Clients} from '/imports/api/clients';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {dictionary} from '/imports/helpers/dictionary';
import {Locations} from '/imports/api/locations';
import {name as PaginationButtons} from '/imports/ui/shared/pagination-buttons/pagination-buttons.component';
import {name as realtyFilter} from '/imports/ui/crm/realty/realty-filter/realty-filter.component';

import './client-suit-exact.view.html';

class ClientSuitExact {
  /* @ngInject */
  constructor($scope, $reactive, $location, $state, $stateParams) {
    $reactive(this).attach($scope);
    let vm = this;
    this.dictionary = dictionary;
    this.stateParams = $stateParams;
    vm.perPage = 20;
    vm.page = this.stateParams.page ? parseInt(this.stateParams.page) : 1;
    this.showSlider = false;
    this.slideShowImages = [];
    vm.sort = {
      'createdAt': -1
    };

    vm.subscribe('findRealtyByNeeds', () => {
      vm.loaded = false;
      return [
        //options
        {
          limit: parseInt(vm.perPage),
          skip: parseInt((vm.getReactively('page') - 1) * vm.perPage),
          sort: vm.getReactively('sort')
        },
        // client.needs
        vm.getReactively('client.need'),
        //client currentrelations
        vm.getReactively('client.relations'),
        //searchType
        vm.getReactively('stateParams.suitby')
      ];
    }, {
      onReady: function () {
        vm.loaded = true;
      }
    });

    vm.helpers({
      client: () => {
        return Clients.findOne({});
      },
      realty: () => {
        return Realty.find({}, {sort: vm.getReactively('sort')});
      },
      realtyCount: () => {
        return Counts.get('realtyCount');
      },
      pagesCount: () => {
        return Math.ceil(Counts.get('realtyCount') / this.perPage);
      }
    });
  }

  setSliderImages(images) {
    console.log(images);
    this.showSlider = true;
    this.slideShowImages = images;
  }

}

const moduleName = 'clientSuitExact';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  realtyFilter,
  PaginationButtons
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-suit/client-suit-exact/client-suit-exact.view.html',
  bindings: {
    selectedTab: '='
  },
  controllerAs: moduleName,
  controller: ClientSuitExact
});
