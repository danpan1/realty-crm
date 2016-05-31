import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Realty} from '/imports/api/realty';
import {Clients} from '/imports/api/clients';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {dictionary} from '/imports/helpers/dictionary';
import {Locations} from '/imports/api/locations';
import {name as realtyFilter} from '/imports/ui/crm/realty/realty-filter/realty-filter.component';

import './client-suit-exact.view.html';

class ClientSuitExact {
  /* @ngInject */
  constructor($scope, $reactive, $state, $stateParams) {
    $reactive(this).attach($scope);
    let vm = this;
    this.dictionary = dictionary;
    this.stateParams = $stateParams;
    this.state = $state;
    this.filter = {};
    this.filter.roomcount = [];
    if(vm.stateParams){
      if(vm.stateParams.floorFrom) vm.filter.floorFrom = vm.stateParams.floorFrom;
      if(vm.stateParams.floorTo) vm.filter.floorTo = vm.stateParams.floorTo;
      if(vm.stateParams.priceFrom) vm.filter.priceFrom = vm.stateParams.priceFrom;
      if(vm.stateParams.priceTo) vm.filter.priceTo = vm.stateParams.priceTo;
      if(vm.stateParams.conditions) vm.filter.conditions = vm.stateParams.conditions;
      if(vm.stateParams.subways) vm.filter.subways = vm.stateParams.subways;
      if(vm.stateParams.roomcount) {
        for(var i in vm.stateParams.roomcount){
          for(var d in vm.dictionary.roomcount){
            console.log(vm.stateParams.roomcount[i]+'+'+vm.dictionary.roomcount[d].id);
            if(vm.stateParams.roomcount[i] == vm.dictionary.roomcount[d].id) {
              vm.filter.roomcount.push(vm.dictionary.roomcount[d]);
              break;
            }
          }
        }
      }
      if(vm.stateParams.districts) vm.filter.districts = vm.stateParams.districts;
      if(vm.stateParams.composition) vm.filter.composition = vm.stateParams.composition;
      if(vm.stateParams.renovation) vm.filter.renovation = vm.stateParams.renovation;
      if(vm.stateParams.metroTime) vm.filter.metroTime = vm.stateParams.metroTime;
      if(vm.stateParams.metroTransport) vm.filter.metroTransport = vm.stateParams.metroTransport;
    }
    vm.perPage = 20;
    vm.page = 1;
    this.showSlider = false;
    this.slideShowImages = [];
    vm.sort = {
      'parseDetails.UID': -1
    };
    
    vm.subscribe('newList', () => {
      return [
        {
          limit: parseInt(vm.perPage),
          skip: parseInt((vm.getReactively('page') - 1) * vm.perPage),
          sort: vm.getReactively('sort')
        },
        {
          floorFrom: vm.getReactively('filter.floorFrom'),
          floorTo: vm.getReactively('filter.floorTo'),
          priceTo: vm.getReactively('filter.priceTo'),
          priceFrom: vm.getReactively('filter.priceFrom'),
          roomcount: vm.getReactively('roomcount'),
          type: vm.getReactively('filter.type'),
          subways: vm.getReactively('filter.subways'),
          districts: vm.getReactively('filter.districts')
        }
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
  
  suitRealty () {
    if(this.filter.floorFrom) this.stateParams.floorFrom = this.filter.floorFrom;
    if(this.filter.floorTo) this.stateParams.floorTo = this.filter.floorTo;
    if(this.filter.priceFrom) this.stateParams.priceFrom = this.filter.priceFrom;
    if(this.filter.priceTo) this.stateParams.priceTo = this.filter.priceTo;
    if(this.filter.conditions) this.stateParams.conditions = this.filter.conditions;
    if(this.filter.subways) this.stateParams.subways = this.filter.subways;
    if(this.filter.roomcount) {
      this.stateParams.roomcount = [];
      for(var i in this.filter.roomcount){
        this.stateParams.roomcount.push(this.filter.roomcount[i].id);
      }
    }
    if(this.filter.districts) this.stateParams.districts = this.filter.districts;
    if(this.filter.composition) this.stateParams.composition = this.filter.composition;
    if(this.filter.renovation) this.stateParams.renovation = this.filter.renovation;
    if(this.filter.metroTime) this.stateParams.metroTime = this.filter.metroTime;
    if(this.filter.metroTransport) this.stateParams.metroTransport = this.filter.metroTransport;
    this.state.go('crm.clients.details.suit', this.stateParams);
  }
  
}

const moduleName = 'clientSuitExact';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  realtyFilter
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-suit/client-suit-exact/client-suit-exact.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientSuitExact
});
