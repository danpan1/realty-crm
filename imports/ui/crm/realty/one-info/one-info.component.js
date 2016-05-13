/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../../api/dictionary';
import {Realty} from '/imports/api/realty';
import {name as OneInfoEdit} from './one-info-edit/one-info-edit.component';

import './one-info.view.html';

class OneInfo {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams, $mdDialog, $mdMedia) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.subscribe('oneInfo', () => {
      return [
        $stateParams.realtyId
      ];
    }, {
      onReady(){
        let realty = Realty.findOne({});
        this.setActiveConditions(realty.details.conditions)
      }
    });

    this.helpers({
      realty: () => {
        return Realty.findOne({});
      }
    });
    // oneInfo
    this.slideNum = 0;
    this.editDialogShow = false;
    this.currentConditions = [];
    for(var i in dictionary.conditions){
        this.currentConditions[i] = {};
    }
    console.log(this.currentConditions);
  }
  
  onConditionsChange (realtyId) {
    this.realty.details.conditions = [];
    //this.currentConditions = [];
    //for(var i in dictionary.conditions){
    //    this.currentConditions[i] = {name: dictionary.conditions[i].id, presence: false};
    //}
    console.log(this.currentConditions);
    for(var i in this.currentConditions){
        if(this.currentConditions[i].presence == true){
            console.log(this.currentConditions[i].name);
            this.realty.details.conditions.push(this.currentConditions[i].name);
        }
    }
    console.log(this.realty.details.conditions);
    Realty.update({_id: realtyId}, {
        $set: this.realty
    }, (error) => {
        if(error) {
        console.log(error)
        } else {
            console.log('call recieved newObj');
        }
    });
  }
  
  setActiveConditions (conditions) {
      console.log(conditions)
      for(var i in conditions){
        for(var n in dictionary.conditions){
            this.currentConditions[n].name = dictionary.conditions[n].id;
            if(conditions[i] == dictionary.conditions[n].id){
                this.currentConditions[n].presence = true;
                console.log(this.currentConditions[n]);
            }
        }
    }
  }  
  
  nextImage(boo, max) {
    if (boo) {
      if (this.slideNum + 1 >= max) {
        this.slideNum = 0;
      }
      else {
        this.slideNum++;
      }
    } else {
      if (this.slideNum - 1 <= 0) {
        this.slideNum = max - 1;
      }
      else {
        this.slideNum--;
      }
    }
  }
  
  showEditDialog () {
      this.editDialogShow = true;
  }
  
}

const moduleName = 'oneInfo';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  OneInfoEdit
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/one-info/one-info.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: OneInfo
});

