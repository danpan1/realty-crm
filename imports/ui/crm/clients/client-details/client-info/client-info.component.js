/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Clients} from '/imports/api/clients/clients.model';
import {dictionary} from '/imports/helpers/dictionary';
import {name as ClientInfoEdit} from './client-info-edit/client-info-edit.component';

import './client-info.view.html';

class ClientInfo {
  /* @ngInject */
  
  /* @ngInject */
  constructor($scope, $reactive, $state, $stateParams, $mdDialog) {
    $reactive(this).attach($scope);
    this.state = $state;
    let vm = this;
    this.mdDialog = $mdDialog;
    this.editDialogShow = false;
    
    this.dictionary = dictionary;
    this.compositionSelected = [];
    for(var i in this.dictionary.composition.length){
        this.compositionSelected.push(false);
    }
    this.currentConditions = [];
    for(var i in dictionary.conditions){
        this.currentConditions[i] = {};
    }
    
    this.subscribe('clientInfo', () => {
      return [
        $stateParams.client
      ];
    }, {
      onReady(){
        let client = Clients.findOne({});
      }
    });
    this.helpers({
      client: () => {
        return Clients.findOne({});
      }
    });
    
  }
  
  ngOnInit() {
      for(var i in this.client.need.renovation){
          this.client.need.renovation[i] = parseInt(this.client.need.renovation[i]);
      }
      this.setActiveConditions(this.client.need.conditions);
  }
  
  archive (client) {
      if(client == this.client){
          this.client.status = 'archive';
          
          this.updateClientInfo();
          
          /*Clients.update({_id: this.client._id}, {
              $set: this.client
          }, (error) => {
              if(error) {
              console.log(error);
              } else {
                  console.log('call recieved newClient');
              }
          });*/
          
          console.log(this.client.status);
          this.state.go('crm.clients.list.my');
      }
  }
  
  onChangeClient (clientId) {
      this.client.composition = [];
      for(var i in this.compositionSelected){
          if(this.compositionSelected[i] == true){
              this.realty.details.composition.push(i);
          }
      }
      
      Clients.update({_id: clientId}, {
        $set: this.client
      }, (error) => {
        if(error) {
          console.log(error)
        } else {
            console.log('call recieved newObj');
        }
      });
      
      this.show = false;
  }
   
  openArchiveDialog (ev) {
      let vm = this;
      console.log(angular.element(document.querySelector('#openArchiveDialog')));
      var confirm = this.mdDialog.confirm()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('В архив')
            .textContent('Перенести клиента в архив?')
            .ariaLabel('Client archivation confirmation')
            .ok('Переместить')
            .cancel('Нет')
            .targetEvent(ev);
        this.mdDialog.show(confirm).then(function() {
            vm.client.status = 'archive';
            
            vm.updateClientInfo();
            
            /*Clients.update({_id: vm.client._id}, {
                $set: vm.client
            }, (error) => {
                if(error) {
                console.log(error);
                } else {
                    console.log('call recieved newClient');
                }
            });*/
            
            console.log(vm.client.status);
            vm.state.go('crm.clients.list.my');
        })
  }
  
  updateClientInfo () {
    Clients.update({_id: this.client._id}, {
        $set: this.client
    }, (error) => {
        if(error) {
        console.log(error);
        } else {
            console.log('call recieved newObj');
        }
    });
  }
  
  onConditionsChange (condition) {
    let index = this.client.need.conditions.indexOf(condition);
    if (index === -1) {
      this.client.need.conditions.push(condition);
    }  else {
      this.client.need.conditions.splice(index, 1);
    }
    console.log(this.client.need.conditions);
    
    this.updateClientInfo();
  }
  
  setActiveConditions (conditions) {
      for(var i in conditions){
        for(var n in dictionary.conditions){
            this.currentConditions[n].name = dictionary.conditions[n].id;
            if(conditions[i] == dictionary.conditions[n].id){
                this.currentConditions[n].presence = true;
            }
        }
    }
  }  
  
  showEditDialog () {
      this.editDialogShow = true;
  }
  
}

const moduleName = 'clientInfo';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  ClientInfoEdit
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-info/client-info.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientInfo
});

