/**
 * Created by Danpan on 10.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './price-mask.view.html';

class PriceMask {
  /* @ngInject */
  constructor($scope, $reactive, $timeout) {
    $reactive(this).attach($scope);
    this.timeout = $timeout;
    if(this.price) {
      this.filterPriceKeyDown();
    }
  }
  
  filterPriceKeyDown(){
    if(!this.visualPrice) this.visualPrice = this.price.toString();
    this.maskPrice();
  }
  
  maskPrice () {
    this.timeout(()=>{
      if(this.visualPrice){
        var oldNumber = this.visualPrice.split('');
        var number = '';
        for(var i in oldNumber){
          if(oldNumber[i].match(/\d/)){
            number = number + oldNumber[i];
          }
        }
        this.price = number;
        number = number.split('').reverse().join('');
        number = number.length > 3 ? number.length > 6 ? number.length > 9 ? number.slice(0, 3) + ' ' + number.slice(3,6) +  ' ' + number.slice(6,9) + ' ' + number.slice(9) : number.slice(0, 3) + ' ' + number.slice(3,6) + ' ' + number.slice(6) :  number.slice(0, 3) + ' ' + number.slice(3) : number;
        number = number.split('').reverse().join('');
        this.visualPrice = number;
      } else {
        this.price = '';
      }
    })
  }
  
}

const moduleName = 'priceMask';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/price-mask/price-mask.view.html',
  bindings: {
      price: '=',
      label: '<',
      flex: '<'
  },
  controllerAs: moduleName,
  controller: PriceMask
});

