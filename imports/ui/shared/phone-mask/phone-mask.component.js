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
  
  filterPhoneKeyPress(){
      if(this.visualPhone[0] != '8') this.visualPhone = '8 ' + this.visualPhone;
      this.phone = this.visualPhone;
  }
  
  filterPhoneKeyUp () {
      console.log(this.visualPhone);
      if(this.errorPhoneNum.test(this.visualPhone)) {
          let phone = this.visualPhone.split('');
          for(var i in [1,2,3]){
              for(var i in phone){
                  if(!phone[i].match(/\+|\s|\(|\)|\-|[0-9]/)){
                      phone.splice(i,1);
                  }
              }
          }
          if(phone[0] !== '8') this.visualPhone = '8 '+phone.join('');
          return false;
      }
  }
  
  filterPhoneFocus () {
      if(!this.visualPhone) this.visualPhone = '8';
  }
  
  filterPhoneBlur () {
      if(this.visualPhone.length > 14 && this.visualPhone[0] + this.visualPhone[1] + this.visualPhone[2] != '8 (') this.visualPhone = '8 ' + this.visualPhone;
      var phone = this.visualPhone.split('');
      for(var i in [1,2,3]){
          for(var i in phone){
              if(phone[i].match(/\+|\(|\)|\-|\s|d/)){
                  phone.splice(i,1);
              }
          }
      }
      this.phone = phone.join('');
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

