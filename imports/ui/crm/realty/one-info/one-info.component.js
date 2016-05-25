/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../../helpers/dictionary';
import {Realty} from '/imports/api/realty';
import {name as OneInfoEdit} from './one-info-edit/one-info-edit.component';

import './one-info.view.html';

class OneInfo {
  /* @ngInject */
  constructor($scope, $reactive, $state, $stateParams, $mdDialog) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.state = $state;
    this.mdDialog = $mdDialog;

    this.helpers({
      realty: () => {
        return Realty.findOne({});
      }
    });
    // oneInfo
    this.slideNum = 0;
    this.archiveConfirm = {
      show: false
    };
    this.editDialogShow = false;
    this.currentConditions = [];
    for (var i in dictionary.conditions) {
      this.currentConditions[i] = {};
    }
    // console.log(this.currentConditions);

    let isConditionsSetted = false;
    this.autorun(() => {

      let conditions = this.getReactively('realty.details.conditions');

      if (conditions && !isConditionsSetted) {
        isConditionsSetted = true;
        this.setActiveConditions(conditions);
      }
    });
  }

  archive(realty) {
    if (realty == this.realty) {
      this.realty.status = 'archive';
      Realty.update({_id: this.realty._id}, {
        $set: this.realty
      }, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('call recieved newObj');
        }
      });
      console.log(this.realty.status);
      this.state.go('crm.realty.list.my');
    }
  }

  onConditionsChange(condition) {
    let index = this.realty.details.conditions.indexOf(condition);
    if (index === -1) {
      this.realty.details.conditions.push(condition);
    } else {
      this.realty.details.conditions.splice(index, 1);
    }
    console.log(this.realty.details.conditions);
    
    this.realtyUpdate();
  }
  
  realtyUpdate () {
    Realty.update({_id: this.realty._id}, {
      $set: this.realty
    }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('call recieved newObj');
      }
    });
  }
   
  openArchiveDialog (ev) {
      let vm = this;
      console.log(angular.element(document.querySelector('#openArchiveDialog')));
      var confirm = this.mdDialog.confirm()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('В архив')
            .textContent('Закрыть сделку и перенести объект в архив?')
            .ariaLabel('Client archivation confirmation')
            .ok('Переместить')
            .cancel('Нет')
            .targetEvent(ev);
        this.mdDialog.show(confirm).then(function() {
            vm.realty.status = 'archive';
            
            this.realtyUpdate();
            
            console.log(vm.realty.status);
            vm.state.go('crm.realty.list.my');
        })
  }

  setActiveConditions(conditions) {
    console.log(conditions)
    for (var i in conditions) {
      for (var n in dictionary.conditions) {
        this.currentConditions[n].name = dictionary.conditions[n].id;
        if (conditions[i] == dictionary.conditions[n].id) {
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

  showEditDialog() {
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

