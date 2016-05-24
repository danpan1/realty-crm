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
  
  ngOnInit() {
      
  }
  
  onChangeRealty (clientId) {     

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

/*
                div(layout="row")
                    p Удобства:
                    p
                        realty-conditions(ng-model='oneInfoEdit.realty.details.conditions' required='') */

