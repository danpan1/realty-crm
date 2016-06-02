/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '/imports/helpers/dictionary';
import {Clients} from '/imports/api/clients';

import './client-info-edit.view.html';

class ClientInfoEdit {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
  }
  
  ngOnInit (price) {
    if (!price) return ''; 
    var number = price.toString();
    number = number.split('').reverse().join('');
    number = number.length > 3 ? number.length > 6 ? number.length > 6 ? number.slice(0, 3) + ' ' + number.slice(3,6) +  ' ' + number.slice(6,9) + ' ' + number.slice(9) : number.slice(0, 3) + ' ' + number.slice(3,6) + ' ' + number.slice(6) :  number.slice(0, 3) + ' ' + number.slice(3) : number;
    number = number.split('').reverse().join('');
    this.client.need.price = number;
  }
  
  onChangeRealty (clientId) {     

      var price = this.client.need.price.split('');
      for(var i in [1,2,3]){
          for(var i in price){
              if(price[i].match(/\s/)){
                  price.splice(i,1);
              }
          }
      }
      price = price.join('');
      this.client.need.price = parseInt(price);
      console.log(this.client.need.price);
    
      Clients.update({_id: clientId}, {
        $set: this.client
      }, (error) => {
        if(error) {
          console.log(error)
        } else {
            console.log('call recieved newClient');
        }
      });

      this.show = false;
  }  
    
}

const moduleName = 'clientInfoEdit';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-info/client-info-edit/client-info-edit.view.html',
  bindings: {
      client: '=',
      show: '='
  },
  controllerAs: moduleName,
  controller: ClientInfoEdit
});