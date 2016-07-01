/**
 * Created by Danpan on 11.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './date-time-picker.view.html';

class DateTimePicker {
  /* @ngInject */
  constructor() {
    this.totalDays = this.totalDays || 7;
    this.startDate = this.startDate || new Date();
    this.daysDictionary = this.days = generateDaysAvailable(this.startDate, this.totalDays);
    this.hoursDictionary = this.hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    this.minsDictionary = this.mins = ['00', '15', '30', '45'];

    this.day = this.days[0] + '';
    // Проверка, чтобы не было дефолтной даты -- для назаначения встречи оператором
    this.hour = this.meeting ? '' : '12';
    this.min = this.meeting ? '' : '00';
    if (!this.meeting) this.setDate();
    else {
      let now = new Date();
      this.checkAvailableHours(now);
      this.checkAvailableMins(now);
    }

    this.$onChanges = function (obj) {
      if(this.meeting && !this.datePicked){
        this.hour = '';
        this.min = '';
      }
    };

  }

  checkAvailableDays(now) {
    if (now.getHours() != this.hoursDictionary[this.hoursDictionary.length - 1] || now.getMinutes() <= this.minsDictionary[this.minsDictionary.length - 1]) return;

    if (this.daysDictionary[1] == undefined) {
      this.noAvailableDates();
    }
    else {
      this.days = this.daysDictionary.slice(1);
      this.day = this.days[0] + '';
    }

  };

  checkAvailableHours(now) {
    let plus = 0;
    if (now.getHours() < this.hoursDictionary[this.hoursDictionary.length - 1] && now.getMinutes() >= this.minsDictionary[this.minsDictionary.length - 1]) plus = 1;  //в 17:45  убираем 17. делаем 18
    this.hours = this.hoursDictionary.slice(now.getHours() + plus);
    if (this.hour < now.getHours() + plus) {
      this.hour = this.hours[0];
    }

  };

  checkAvailableMins(now) {
    if (now.getHours() != this.hour)  return;
    for (let i = 0; i < this.minsDictionary.length - 1; i++) { // mins.length - 1 чтобы не попадать на '45 минут' , чтобы можно было index плюсануть
      if (now.getMinutes() >= this.minsDictionary[i]) {
        this.mins = this.minsDictionary.slice(i + 1);
      }
    }

    if (this.min <= now.getMinutes()) {
      this.min = this.mins[0];
    }
  };

  checkAvailableDates() {
    let now = new Date();
    let pickedDay = new Date(Number(this.day));
    let today = (pickedDay.getDate() === now.getDate());

    this.checkAvailableDays(now);
    this.hours = this.hoursDictionary;
    this.mins = this.minsDictionary;
    if (!today) {
      return;
    }
    this.checkAvailableHours(now);
    this.checkAvailableMins(now);
  };

  noAvailableDates() {
    console.log('noAvailableDates. give this realty to another realtor');
  }

  setDate() {
    this.checkAvailableDates();
    let date = new Date(Number(this.day));
    date.setHours(this.hour);
    date.setMinutes(this.min);
    date.setSeconds(0);
    this.datePicked = date;
    // console.log(date);
  }
}

function generateDaysAvailable(startDate, totalDays) {
  let array = [];
  let latestDate = new Date(startDate);
  latestDate.setDate(latestDate.getDate() + totalDays);
  for (let i = 0; i < totalDays + 1; i++) {
    let date = new Date();
    date.setDate(date.getDate() + i);
    array.push(date.getTime());
    if (latestDate.getDate() == date.getDate()) {
      break;
    }
  }
  // console.log(array);
  return array;
}

const moduleName = 'dateTimePicker';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/date-time-picker/date-time-picker.view.html',
  bindings: {
    datePicked: '=ngModel',
    startDate: '=',
    totalDays: '=',
    meeting: '<',
    restart: '<' // Нужно для проверки, отправил ли оператор объект 
  },
  controllerAs: moduleName,
  controller: DateTimePicker
});
