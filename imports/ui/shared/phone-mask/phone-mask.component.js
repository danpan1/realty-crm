/**
 * Created by Danpan on 10.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './phone-mask.view.html';

class PhoneMask {
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    $reactive(this).attach($scope);
    this.$timeout = $timeout;
    this.visualPhone = this.phone;
    this.errorPhoneNum = /([^\-\s\(\)\+0-9]|\s{2,})/;
  }
        
  ngOnInit () {
    if(this.visualPhone.length > 5){
      var value = this.visualPhone.toString().trim().replace(/^\+/, '');
      var country, city, number, main;
      country = value[0];
      city = value.slice(1, 4);
      number = value.slice(4);
      main = city ? city.length >= 3 ? (country + ' (' + city + ') ') : (country + ' (' + city) : country;
      number = number ? number.length > 3 ? number.length > 5 ? number.slice(0, 3) + '-' + number.slice(3,5) + '-' + number.slice(5) :  number.slice(0, 3) + '-' + number.slice(3) : number : '';
      this.visualPhone = (main + number).trim();
    }
  }
  
  filterPhoneChanged (e) {
    let oldValue = e.phoneMask.visualPhone.split('');
    let value = '';
    for(var i in oldValue){
      if(oldValue[i].match(/\d/)){
          value = value + oldValue[i];
      }
    }
    this.phone = value;
  }
  
  filterPhoneKeyDown (e) {
    if (!this.visualPhone || this.visualPhone[0] !== '8') this.visualPhone = '8' + (this.visualPhone ? this.visualPhone : '');
    let oldValue = this.visualPhone.split('');
    let value = '';
    for(var i in oldValue){
      if(oldValue[i].match(/\d/)){
          value = value + oldValue[i];
      }
    }
    this.phone = value;
    var country = this.phone[0];
    var city = this.phone.slice(1, 4);
    var number = this.phone.slice(4);
    city = city ? ' (' + city : ' (';
    number = number ? number.length > 3 ? number.length > 5 ? ') ' + number.slice(0, 3) + '-' + number.slice(3,5) + '-' + number.slice(5) :  ') ' + number.slice(0, 3) + '-' + number.slice(3) : ') ' + number : '';
    this.visualPhone = (country + city + number).trim();
  }
  
  filterPhoneFocus () {
    if(!this.visualPhone) this.visualPhone = '8';
  }
  
}

const moduleName = 'phoneMask';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/phone-mask/phone-mask.view.html',
  bindings: {
      phone: '=',
      label: '<'
  },
  controllerAs: moduleName,
  controller: PhoneMask
});

