/**
 * Created by Danpan on 26.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../../helpers/dictionary';
import {name as districtsAreaIdList} from '/imports/ui/shared/district-chips/district-chips.component.js';
import {name as PriceMask} from '/imports/ui/shared/price-mask/price-mask.component';
import './realty-filter.view.html';
import {CountsDan} from '/imports/api/counts';

class RealtyFilter {
  /* @ngInject */
  constructor($scope, $reactive, $timeout, $location, $state, $stateParams) {
    $reactive(this).attach($scope);
    let vm = this;
    this.$timeout = $timeout;
    this.helpers({
      realtyCount: () => {
        this.realtyCount = false;
        let с = CountsDan.findOne({});
        if (с) {
          return с.count;
        } else {
          return 0;
        }
      }
    });
    this.dictionary = dictionary;
    this.location = $location;
    this.stateParams = $stateParams;
    this.state = $state;
    this.filter = {};
    this.fake = true;
    
    if (window.localStorage["filter"] != undefined && window.localStorage["filter"]) {
      console.log(JSON.parse(window.localStorage["filter"]));
      this.filter = JSON.parse(window.localStorage["filter"]);
      this.filter.type = this.stateParams.operation == 'sale' ? 1 : 4;
      var roomList = this.filter.roomcount;
      this.filter.roomcount = [];
      for(var i in roomList) {
        switch (roomList[i].id) {
          case 1:
            this.toggleRoomcount(this.dictionary.roomcount[0]);
            break;
          case 2:
            this.toggleRoomcount(this.dictionary.roomcount[1]);
            break;
          case 3:
            this.toggleRoomcount(this.dictionary.roomcount[2]);
            break;
          case 99:
            this.toggleRoomcount(this.dictionary.roomcount[3]);
            break;
        }
      }
    }
  }
  
  clearFilter () {
    this.filter = {
      type: this.stateParams.operation == 'sale' ? 1 : 4,
      roomcount: []
    };
    this.suitRealty();
  }
  
  suitRealty () {
    window.localStorage["filter"] = JSON.stringify(this.filter, function (key, val) {
      if (key == '$$hashKey') {
        return undefined;
      }
      return val;
    });
    console.log(window.localStorage["filter"]);
  }

  toggleRoomcount(item) {
    if(!this.filter.roomcount) this.filter.roomcount = []; 
      var idx = this.filter.roomcount.indexOf(item);
      if (idx > -1) {
        this.filter.roomcount.splice(idx, 1);
      }
      else {
        this.filter.roomcount.push(item);
      }
      this.roomcount = this.filter.roomcount.slice();
    this.$timeout(()=>{
      this.suitRealty();
    },100)    
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
  districtsAreaIdList,
  PriceMask
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/realty-filter/realty-filter.view.html',
  bindings: {
    filter: '=',
    roomcount: '=',
    realtyCount: '=ngModel'
  },
  controllerAs: moduleName,
  controller: RealtyFilter
});









// From constructor

    //this.filter.roomcount = [];
    /*if(vm.stateParams){
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
    }*/
    
// From suitRealty

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
    /*if(this.location.url().match(/client=\d+/)){
      var newPath = this.location.path()+'?client='+this.location.url().match(/client=\d+/)[0].slice(7)+'&page='+this.stateParams.page+'&suitby=exact&activetab=suit';  
    }else{
      var newPath = this.location.path()+'?search=true&page='+this.stateParams.page;  
    }    
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
    console.log(newPath);
    this.filter.request = newPath;*/
    //window.history.replaceState(null, null, newPath);
    //if(this.stateParams.page) this.state.go('crm.clients.details.suit', {page:1});