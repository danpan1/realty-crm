/**
 * Created by  Danpan on 25.04.16.
 */
import angular from 'angular';
import {Meteor} from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import {name as dateTimepPicker} from '/imports/ui/shared/date-time-picker/date-time-picker.component';
import {dictionary} from '/imports/helpers/dictionary';
import {Agents} from '/imports/api/agents';
import './outgoing-call-info.view.html';

class OutgoingCallInfo {
  /* @ngInject */
  constructor($scope, $reactive, $timeout, $state) {
    $reactive(this).attach($scope);
    let vm = this;
    this.$timeout = $timeout;
    this.today = new Date();
    this.dictionary = dictionary;
  }

  copyInfo() {
    var input = document.getElementById("hiddenInfo");
    input.select();
    document.execCommand("copy");
    this.infoWasCopied = true;
  }

  agency() {
    console.log('agency')
    this.showLoader = true;
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

    this.setResolution({status:'agency'});
  }

  
  setResolution(status, laterCall) {
    //console.log('status: ', status);
    //console.log('laterCall: ', laterCall);
    this.showLoader = true;
    const vm = this;
    let notAvailable = '';
    vm.isLoading = true;
    let data = {
      _id: vm.realty._id,
      status: status,
      operator: {}
    };
    if (laterCall) {
      if (laterCall == 'laterDatePicked') {
        data.laterCall = vm.datePicked;
        vm.stat = 'objectsDelayed';
      }
      else if (laterCall == 'notAvailable') {
        notAvailable = 'notAvailable';
        vm.stat = 'objectsNotAvailable';
      }
    } 
    else if(status == 'archive') vm.stat = 'objectsNoActual';
    else if(status == 'analyze') vm.stat = 'objectsSkipped';
    else if(status == 'agency') vm.stat = 'objectsAgency';

    console.log(status, data);

    Meteor.call('operatorSet', data, notAvailable, (error)=> {
      if (error) {
        this.showLoader = false;
        console.log('error', error);
      } else {
        Meteor.call('operatorStat', vm.stat, (error, result) => {
          if (error) console.log(error)
          else console.log(result);
        });
      }
      this.getNew();
    });

    this.infoWasCopied = false;

  }


}

const moduleName = 'outgoingCallInfo';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  dateTimepPicker
]).component(moduleName, {
  templateUrl: 'imports/ui/call-center/outgoing-call/outgoing-call-info/outgoing-call-info.view.html',
  bindings: {
    user: '<',
    realty: '=',
    getNew: '&',
    showLoader: '='
  },
  controllerAs: moduleName,
  controller: OutgoingCallInfo
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