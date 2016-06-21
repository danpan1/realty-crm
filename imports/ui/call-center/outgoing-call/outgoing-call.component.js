/**
 * Created by  Danpan on 25.04.16.
 */
import angular from 'angular';
import {Meteor} from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import {name as realtyConditions} from '../../shared/realty-conditions/realty-conditions.component';
import {name as subwayChips} from '/imports/ui/shared/subway-chips/subway-chips.component';
import {name as realtyStreet} from '/imports/ui/shared/realty-street/realty-street.component';
import {name as districtSingle} from '/imports/ui/shared/district-single/district-single.component';
import {name as dateTimepPicker} from '/imports/ui/shared/date-time-picker/date-time-picker.component';
import {dictionary} from '/imports/helpers/dictionary';
import {Realty} from '/imports/api/realty';
import {Agents} from '/imports/api/agents';
import './outgoing-call.view.html';

class OutgoingCall {
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    this.today = new Date();
    this.dictionary = dictionary;
    this.fullList = 0;
    this.getList();
    this.getNew();
  }
  
  copyInfo () {
    var input = document.getElementById("hiddenInfo");
    input.select();
    document.execCommand("copy");
  }
  
  setResolution(status, laterCall) {
    const vm = this;
    let notAvailable = '';
    vm.isLoading = true;
    let data = {
      _id: vm.realty._id,
      status: status,
      operator: vm.operator
    };

    if (laterCall == 'laterDatePicked') {
      data.laterCall = vm.datePicked;
    }
    else if (laterCall == 'notAvailable') {
      notAvailable = 'notAvailable';
    }

    console.log(status, data);

    Meteor.call('operatorSet', data, notAvailable, (error)=> {
      if (error) {
        console.log('error', error);
      }
      vm.getNew();
    });

  }

  agency() {
    const vm = this;
    //добавляем телефон из объявления
    Agents.insert({
      phone: vm.realty.contacts[0].phones[0].phone,
      name: vm.realty.contacts[0].name
    });
    //добавляем телефон с картинки
    if (vm.agencyTel) {
      Agents.insert({
        phone: vm.agencyTel,
        name: 'AgencyFromPhoto'
      });
      vm.agencyTel = '';
    }

    vm.setResolution('agency');
  }

  save(valid) {
    const vm = this;
    console.log(valid, 'valid');
    if (!valid) {
      return;
    }
    vm.isLoading = true;
    let district = {
      _id: vm.realty.address.districtId._id,
      name: vm.realty.address.districtId.name
    };
    if (vm.realty.comission) vm.realty.isCommission = 1; 
    vm.realty.address.districtId = district._id;
    vm.realty.address.districtName = district.name;
    if (vm.realty.address.area) {
      vm.realty.address.areaId = vm.realty.address.area._id;
      vm.realty.address.areaName = vm.realty.address.area.name;
    }
    vm.realty.status = 'list';
    console.log('save realty', vm.realty);
    Meteor.call('operatorSave', vm.realty, (error)=> {
      if (error) {
        console.log('error', error);
      }
      vm.getNew();
    });
  }
  
  getList() {
    Meteor.call('callList', (error, result)=> {
      if (error) {
        console.log('error', error);
      } else {
        for(var i in result) {
          if(result[i]._id.status == 'new' || result[i]._id.status == 'later') this.fullList += result[i].count;
        }
        
      }
    });
  }

  getNew() {
    this.isLoading = true;
    const vm = this;
    Meteor.call('operatorGet', (error, result)=> {
      // vm.realty.address.subways = ['FRmpz68NzBxzoPQJ7'];

      if (error) {
        console.log('error', error);
      }

      this.$timeout(()=> {
        vm.realty = result;
        // vm.realty.address.subways = result.address.subways;
        // vm.subways22 = result.address.subways.slice();
        // vm.realty.address.districtIdForm = vm.realty.address.districtId;
        vm.isLoading = false;
        vm.operator = {};
        console.log('новый объект', vm.realty);
        // vm.realty.details.conditions = ['kitchen_furniture','tv'];
        if (!result) {
          vm.isLoading = true;
        } else {
          vm.realty.operation = vm.realty.operation || 0;
          vm.realty.exclusive = true;
        }
      });
      // this.realty.address.subways = ['FRmpz68NzBxzoPQJ7'];

    });

  }

}

const moduleName = 'outgoingCall';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  realtyConditions,
  realtyStreet,
  dateTimepPicker,
  districtSingle,
  subwayChips
]).component(moduleName, {
  templateUrl: 'imports/ui/call-center/outgoing-call/outgoing-call.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: OutgoingCall
})
  .filter('dateMonthRu', function () {
    return function (input) {
      if (typeof input !== 'string') {
        input = new Date(input);
      }
      else {
        console.log('wrong input date format. not time');
      }

      let date;

      try {
        date = new Date(input);
      } catch (error) {
        console.error(error);
      }

      return date.getDate() + ' ' + getMonthName(date.getMonth());
    };
  });

function getMonthName(m) {
  let monthNames = [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
  ];
  return monthNames[m];
}