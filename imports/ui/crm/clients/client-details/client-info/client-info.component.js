/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Clients} from '/imports/api/clients/clients.model';
import {dictionary} from '/imports/helpers/dictionary';

import './client-info.view.html';

class ClientInfo {
  /* @ngInject */
  
  /* @ngInject */
  constructor($scope, $reactive, $state, $stateParams) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.compositionSelected = [];
    for(var i in this.dictionary.composition.length){
        this.compositionSelected.push(false);
    }
    
    this.subscribe('clientInfo', () => {
      return [
        $stateParams.client
      ];
    }, {
      onReady(){
        let client = Clients.findOne({});
        //this.setActiveConditions(realty.details.conditions)
      }
    });
    this.helpers({
      client: () => {
        return Clients.findOne({});
      }
    });
    
  }
  
  ngOnInit() {
      if(!this.realty.details.composition) this.realty.details.composition = new Array(this.dictionary.composition.length);
  }
  
  onChangeClient (clientId) {
      this.client.composition = [];
      for(var i in this.compositionSelected){
          if(this.compositionSelected[i] == true){
              this.realty.details.composition.push(i);
          }
      }
      
      Realty.update({_id: realtyId}, {
        $set: this.realty
      }, (error) => {
        if(error) {
          console.log(error)
        } else {
            console.log('call recieved newObj');
        }
      });
      
      this.show = false;
  }  
  
  addRoomSquare () {
    console.log(this.realty.details.roomsSquare.length)
    this.realty.details.roomsSquare.push({square:0});
  }
  
}

const moduleName = 'clientInfo';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-info/client-info.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientInfo
});

