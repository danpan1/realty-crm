/**
 * Created by Danpan on 10.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './phone-mask.view.html';

class PhoneMask {
  /* @ngInject */
  constructor($scope, $reactive, $state) {
    $reactive(this).attach($scope);
    this.visualPhone = this.phone;
  }
        
  filterPhoneKeyPress(){
      if(this.visualPhone.length >= 17) return false;
      if(this.visualPhone[0] != '8') this.visualPhone = '8 ' + this.visualPhone;
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

