/**
 * Created by  Danpan on 25.04.16.
 */
import angular from 'angular';
import {Meteor} from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import {name as realtyConditions} from '../../shared/realty-conditions/realty-conditions.component';
import {name as subwayChips} from '/imports/ui/shared/subway-chips/subway-chips.component';
import {name as subwayChoice} from '/imports/ui/shared/subway-choice/subway-choice.component';
import {name as realtyStreet} from '/imports/ui/shared/realty-street/realty-street.component';
import {name as districtSingle} from '/imports/ui/shared/district-single/district-single.component';
//import {name as dateTimepPicker} from '/imports/ui/shared/date-time-picker/date-time-picker.component';
import {name as PriceMask} from '/imports/ui/shared/price-mask/price-mask.component';
import {dictionary} from '/imports/helpers/dictionary';
import {Realty} from '/imports/api/realty';
import {Agents} from '/imports/api/agents';

import {name as OutgoingCallInfo} from './outgoing-call-info/outgoing-call-info.component';
import {name as OutgoingCallDetails} from './outgoing-call-details/outgoing-call-details.component';
import {name as OutgoingCallComments} from './outgoing-call-comments/outgoing-call-comments.component';
import {name as OutgoingCallOwner} from './outgoing-call-owner/outgoing-call-owner.component';

import './outgoing-call.view.html';

class OutgoingCall {
  /* @ngInject */
  constructor($scope, $reactive, $timeout, $state) {
    $reactive(this).attach($scope);
    let vm = this;
    this.$state = $state;
    this.$timeout = $timeout;
    this.today = new Date();
    this.dictionary = dictionary;
    this.type = 4;
    this.newBuilding = 1;
    this.rentDuration = 0;
    this.newObjectRecieved = 1;
    this.stat = '';
    this.currentConditions = [];

    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        vm.user = user;
        if (user.roles.indexOf('operator') > -1) {
          vm.getNew();
          console.log('Всё ок');
        } else {
          console.log('Нет доступа к коллцентру');
          vm.$state.go('crm.realty.list.my');
        }
      }
    });

  }

  copyInfo() {
    var input = document.getElementById("hiddenInfo");
    input.select();
    document.execCommand("copy");
    this.infoWasCopied = true;
  }

  save (valid) {

    if (typeof this.realty.address.street != 'string') this.realty.address.street = this.realty.address.street.value;
    if (typeof this.realty.address.house != 'string') this.realty.address.house = this.realty.address.house.value;
    if(!this.realty.address.city) this.realty.address.city = "Москва";

    this.showLoader = true;
    const vm = this;
    if (!valid) {
      return;
    }
    vm.isLoading = true;
    
    // платит ли комиссию
    if (vm.realty.owner && vm.realty.owner.comission) {
      this.statComission = true;
      this.realty.owner.isComission = true; 
      this.realty.owner.comission = parseInt(this.realty.owner.comission); 
    } else {
      this.statComission = false;
    }

    // определяем тип объекта
    if (vm.operation == 1) {
      vm.realty.type = vm.newBuilding == 1 ? 2 : 1 ;
    } else if (vm.operation == 0) {
      vm.realty.type = vm.rentDuration == 0 ? 3 : 4;
    }

    if (vm.realty.address.districtId) {
      let district = {
        _id: vm.realty.address.districtId._id,
        name: vm.realty.address.districtId.name
      };
      vm.realty.address.districtId = district._id;
      vm.realty.address.districtName = district.name;
    }
    if (vm.realty.address.area) {
      vm.realty.address.areaId = vm.realty.address.area._id;
      vm.realty.address.areaName = vm.realty.address.area.name;
    }
    if (!vm.realty.operator) vm.realty.operator = {};
    if(vm.meetingTime){
      vm.realty.operator.meetingTime = vm.meetingTime;
      vm.meetingTime = undefined;
    }

    let exclusive = vm.realty.realtor ? vm.realty.realtor.isExclusive : false;
    let comission = this.realty.owner ? this.realty.owner.comission : false;
    let meeting = vm.realty.operator.meetingTime ? true : false;

    if (comission || exclusive || meeting) {
      var d = new Date().getTime();
      vm.realty.operator.oceanAdd = d;
    }
    /*if (vm.newBuilding === 1) {
      vm.realty.type = 2;
    }*/

    vm.realty.status = 'list';
    vm.stat = comission ? exclusive ? 'objectsSavedComAndExc' : 'objectsSavedCom' : exclusive ? 'objectsSavedExc' : 'objectsSaved';
    
    let price = 0; // Определяем цену объекта
    if (exclusive) {
      if(comission){
        if (comission > 50) {
          if (vm.realty.operator.meetingTime) price = 9;
          else price = 8;
        } else if (comission <= 50) {
          if (vm.realty.operator.meetingTime) price = 7;
          else price = 6;
        }
      } else if (vm.realty.operator.meetingTime) price = 6;
        else price = 5;
    } else if (comission) {
        if (comission > 50) {
          if (vm.realty.operator.meetingTime) price = 4;
          else price = 3;
        } else if (comission <= 50) {
          if (vm.realty.operator.meetingTime) price = 2;
          else price = 1;
        }
    } else if (vm.realty.operator.meetingTime) price = 1;
    
    vm.realty.operator.oceanPrice = price;
    console.log(vm.realty);
    Meteor.call('operatorSave', vm.realty, (error)=> {
      if (error) {
        this.showLoader = false;
        console.log('error', error);
        this.getNew();
      } else {
        vm.newObjectRecieved = (vm.newObjectRecieved + 1);
        Meteor.call('operatorStat', vm.stat, (error, result) => {
          if (error) {
            console.log(error);
            this.getNew();
          } else {
            this.getNew();
          }
        });
        Meteor.call('sendFilterSms', vm.realty, (error, result) => {
          if (error) {
            console.log(error);
          } else {
          }
        });
      }
    });
  }
  

  getList(isStandart) {
    Meteor.call('callList', (error, result)=> {
      if (error) {
        console.log('error', error);
      } else {
        this.$timeout(()=> {
          this.fullList = result;
        });
      }
    });
    if (isStandart || !this.firstCount) {
      this.$timeout(()=> {
        this.getList(true);
      }, 2000);
      if (!this.firstCount) this.firstCount = true;
    }
  }

  getNew() {
    this.realty = {};
    console.log('getNew');
    this.showLoader = true;
    this.isLoading = true;
    const vm = this;
    Meteor.call('operatorGet', (error, result)=> {
      // vm.realty.address.subways = ['FRmpz68NzBxzoPQJ7'];

      if (error) {
        this.showLoader = false;
        console.log('error', error);
      }

      console.log('loaded ', result);
      this.$timeout(() => {
        console.log(result.contacts[0].phones[0].phone);

        // Проверяем, не является ли объект ламповым
        //Meteor.call('checkLamp', result.contacts[0].phones[0].phone, (lampError, isItLamp) => {
        //  if (lampError) {
        //    console.log(lampError);
        //  } else {
        //    console.log(isItLamp)
        //    // Если объект не ламповый
        //    if (isItLamp != true) {
              vm.realty = result;
              vm.realty.price = result.price;
              vm.newObjectRecieved += 1;
              vm.isLoading = false;
              vm.operator = {};
              if (!result) {
                this.showLoader = false;
                vm.isLoading = true;
              } else {
                this.showLoader = false;
                if (vm.realty.square === 0) {
                  vm.realty.square = '';
                  //if(vm.realty.realtor) vm.realty.realtor.isExclusive = true; else vm.realty.realtor = {isExclusive:true};
                }
              }
              this.infoWasCopied = false;
        //    } else {
        //      console.log('It\'s a lamp!')
        //      vm.removeRealty(result._id);
        //    }
        //  }
        //});

      });

      this.getList(false);

    });
  }

}

const moduleName = 'outgoingCall';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  OutgoingCallInfo,
  OutgoingCallDetails,
  OutgoingCallComments,
  OutgoingCallOwner,
  realtyConditions,
  realtyStreet,
  districtSingle,
  subwayChips,
  subwayChoice,
  PriceMask
]).component(moduleName, {
  templateUrl: 'imports/ui/call-center/outgoing-call/outgoing-call.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: OutgoingCall
})