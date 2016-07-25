/**
 * Created by Danpan on 26.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../../helpers/dictionary';
import {name as districtsAreaIdList} from '/imports/ui/shared/district-chips/district-chips.component.js';
import {name as SubwayChips} from '/imports/ui/shared/subway-chips/subway-chips.component.js';
import {name as PriceMask} from '/imports/ui/shared/price-mask/price-mask.component';
import './realty-filter.view.html';
import {CountsDan} from '/imports/api/counts';

class RealtyFilter {
  /* @ngInject */
  constructor($scope, $reactive, $timeout, $location, $state, $stateParams) {
    $reactive(this).attach($scope);
    let vm = this;
    this.$timeout = $timeout;
    this.dictionary = dictionary;
    this.location = $location;
    this.stateParams = $stateParams;
    this.state = $state;
    this.filter = {};
    this.fake = true;
    if(this.parent == 'ocean') {
      //this.filter = {};
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
      if (window.localStorage["filter"] != undefined && window.localStorage["filter"]) {
        console.log(JSON.parse(window.localStorage["filter"]));
        this.filter = JSON.parse(window.localStorage["filter"]);
        this.checkRooms();
        if(this.filter.type !== undefined) this.filterType = this.filter.type;
        if(!this.filter.metroTransport) this.filter.metroTransport = 0;
      }
    } else if (this.parent == 'custom') {
      this.checkRooms();
    }
    if (this.parent == 'ocean'){
      this.$onChanges = function (changed) {
        console.log(changed.name);
        this.checkRooms();
        this.suitRealty();
      }
    }
  }
  
  checkRooms () {
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

  clearFilter () {
    this.filter = {
      //type: this.stateParams.operation == 'sale' ? 1 : 4,
      roomcount: [],
      metroTransport: 0

    };
    this.suitRealty();
    this.refreshSublings = !this.refreshSublings;
  }
  
  suitRealty () {
    if (this.parent == 'ocean') {
      this.filter.type = this.filterType;
      window.localStorage["filter"] = JSON.stringify(this.filter, function (key, val) {
        if (key == '$$hashKey') {
          return undefined;
        }
        return val;
      });
      console.log(window.localStorage["filter"]);
    }
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
    if (this.parent == 'ocean') {
      this.$timeout(()=>{
        this.suitRealty();
      },100)  
    }
  }

  existsRoomcount(item) {
    if(this.filter.roomcount) return this.filter.roomcount.indexOf(item) > -1;
  }

}

const moduleName = 'realtyFilter';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  districtsAreaIdList,
  PriceMask,
  SubwayChips
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/realty-filter/realty-filter.view.html',
  bindings: {
    filter: '=',
    roomcount: '=',
    realtyCount: '=',
    parent: '<',
    filterType:'=',
    refresh: '<'
  },
  controllerAs: moduleName,
  controller: RealtyFilter
});