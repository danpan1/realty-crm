/**
 * Created by Danpan on 26.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../../helpers/dictionary';
import {name as districtsAreaIdList} from '/imports/ui/shared/district-chips/district-chips.component.js';
import './realty-filter.view.html';

class RealtyFilter {
  /* @ngInject */
  constructor($scope, $reactive, $timeout, $location, $state, $stateParams) {
    this.$timeout = $timeout;
    $reactive(this).attach($scope);
    let vm = this;
    this.dictionary = dictionary;
    this.location = $location;
    this.stateParams = $stateParams;
    this.state = $state;
    this.filter = {};
    this.filter.roomcount = [];
    console.log(vm.stateParams);
    if(vm.stateParams){
      if(vm.stateParams.floorFrom) vm.filter.floorFrom = vm.stateParams.floorFrom;
      if(vm.stateParams.floorTo) vm.filter.floorTo = vm.stateParams.floorTo;
      if(vm.stateParams.priceFrom) vm.filter.priceFrom = vm.stateParams.priceFrom;
      if(vm.stateParams.priceTo) vm.filter.priceTo = vm.stateParams.priceTo;
      if(vm.stateParams.conditions) vm.filter.conditions = vm.stateParams.conditions;
      if(vm.stateParams.subways) vm.filter.subways = typeof vm.stateParams.subways == 'object' ? vm.stateParams.subways : [vm.stateParams.subways];
      if(vm.stateParams.districts) vm.filter.districts = typeof vm.stateParams.districts == 'object' ? vm.stateParams.districts : [vm.stateParams.districts];
      if(vm.stateParams.roomcount) {
        for(var i in vm.stateParams.roomcount){
          for(var d in vm.dictionary.roomcount){
            if(vm.stateParams.roomcount[i] == vm.dictionary.roomcount[d].id) {
              vm.filter.roomcount.push(vm.dictionary.roomcount[d]);
              break;
            }
          }
        }
      }
      if(vm.stateParams.composition) vm.filter.composition = vm.stateParams.composition;
      if(vm.stateParams.renovation) vm.filter.renovation = vm.stateParams.renovation;
      if(vm.stateParams.metroTime) vm.filter.metroTime = vm.stateParams.metroTime;
      if(vm.stateParams.metroTransport) vm.filter.metroTransport = vm.stateParams.metroTransport;
    }
  }
  
  suitRealty () {
    /*if(this.filter.floorFrom) this.stateParams.floorFrom = this.filter.floorFrom;
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
    if(this.filter.metroTransport) this.stateParams.metroTransport = this.filter.metroTransport;*/
    if(this.location.url().match(/client=\d+/)){
      var newPath = this.location.path()+'?client='+this.location.url().match(/client=\d+/)[0].slice(7)+'&page='+this.stateParams.page+'&suitby=exact&activetab=suit';  
    }else{
      var newPath = this.location.path()+'?search=true&page='+this.stateParams.page;  
    }    
    console.log(newPath);
    console.log(this.location.url());
    if(this.filter.floorFrom) newPath += '&floorFrom=' + this.filter.floorFrom;
    if(this.filter.floorTo) newPath+='&floorTo='+this.filter.floorTo;
    if(this.filter.priceFrom) newPath+='&priceFrom='+this.filter.priceFrom;
    if(this.filter.priceTo) newPath+='&priceTo='+this.filter.priceTo;
    if(this.filter.metroTime) newPath+='&metroTime='+this.filter.metroTime;
    if(this.filter.metroTransport) newPath+='&metroTransport='+this.filter.metroTransport;
    if(this.filter.districts) {
      for(var i in this.filter.districts){
        newPath += '&districts='+this.filter.districts[i];
      }
    }
    if(this.filter.roomcount) {
      for(var i in this.filter.roomcount){
        newPath += '&roomcount='+this.filter.roomcount[i].id;
      }
    }
    if(this.filter.subways) {
      for(var i in this.filter.subways){
        newPath += '&subways='+this.filter.subways[i];
      }
    }
    if(this.filter.composition) {
      for(var i in this.filter.composition){
        newPath += '&composition='+this.filter.composition[i];
      }
    }
    if(this.filter.renovation) {
      for(var i in this.filter.renovation){
        newPath += '&renovation='+this.filter.renovation[i];
      }
    }
    if(this.filter.conditions) {
      for(var i in this.filter.conditions){
        newPath += '&conditions='+this.filter.conditions[i];
      }
    }
    history.pushState(null, null, newPath);
    //if(this.stateParams.page) this.state.go('crm.clients.details.suit', {page:1});
  }

  toggleRoomcount(item) {
      var idx = this.filter.roomcount.indexOf(item);
      if (idx > -1) {
        this.filter.roomcount.splice(idx, 1);
      }
      else {
        this.filter.roomcount.push(item);
      }
      this.roomcount = this.filter.roomcount.slice();
    //this.$timeout(()=> {
    //  this.suitRealty();
    //}, 10);
    // console.log(this.roomcount);
    // console.log(this.filter);
    
  }

  existsRoomcount(item) {
    // console.log(this.filter.roomcount);
    if(this.filter.roomcount) return this.filter.roomcount.indexOf(item) > -1;
  }

}

const moduleName = 'realtyFilter';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  districtsAreaIdList
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/realty-filter/realty-filter.view.html',
  bindings: {
    filter: '=',
    roomcount: '='
  },
  controllerAs: moduleName,
  controller: RealtyFilter
});

