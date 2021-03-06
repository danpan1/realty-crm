/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../../helpers/dictionary';
import {Realty} from '/imports/api/realty';
import {name as OneInfoEdit} from './one-info-edit/one-info-edit.component';
import {name as Loader} from '/imports/ui/shared/loader/loader.component';

import './one-info.view.html';

class OneInfo {
  /* @ngInject */
  constructor($scope, $reactive, $state, $timeout, $stateParams, $mdDialog, $mdToast) {
    $reactive(this).attach($scope);
    let vm = this;
    this.dictionary = dictionary;
    this.state = $state;
    this.$timeout = $timeout;
    this.mdDialog = $mdDialog;
    //this.mdToast = $mdToast;
    this.realty = Realty.findOne({_id: $stateParams.realtyId});
    // oneInfo
    this.slideNum = 0;
    this.archiveConfirm = {
      show: false
    };
    this.editDialogShow = false;
    this.currentConditions = [];

    this.helpers({
      realty: () => {
        return Realty.findOne({_id: $stateParams.realtyId});
      }
    });
    function setConditions () {
      if (vm.realty) {
        for (var i in dictionary.conditions) {
          vm.currentConditions[i] = {};
        }
        if (vm.realty.details.conditions) {
          vm.setActiveConditions(vm.realty.details.conditions);
        }
      } else {
        vm.$timeout(() => {
          setConditions();
        }, 100);
      }
    }
    setConditions();
    
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
    let index;
    if (this.realty.details.conditions) {
      index = this.realty.details.conditions.indexOf(condition);
    }
    else {
      this.realty.details.conditions = [];
      index = -1;
    }
    if (index === -1) this.realty.details.conditions.push(condition);
    else this.realty.details.conditions.splice(index, 1);
    console.log(this.realty.details.conditions);
    this.realtyUpdate();
  }

  openAdSource (url) {
    window.open(url);
  }

  realtyUpdate() {

    if (typeof this.realty.details.roomsSquare != 'string') this.realty.details.roomsSquare = '';

    let value = this.realty.contacts[0].phones[0].phone.split('');
    for (var i in [1, 2, 3]) {
      for (var i in value) {
        if (value[i].match(/\+|\(|\)|\-|\s|d/)) {
          value.splice(i, 1);
        }
      }
    }
    value = value.join('');
    this.realty.contacts[0].phones[0].phone = parseInt(value);
    this.showLoader = true;
    Realty.update({_id: this.realty._id}, {
      $set: this.realty
    }, (error) => {
      if (error) {
        console.log(error);
        this.showLoader = false;
      } else {
        //this.showSimpleToast();
        console.log('call recieved newObj');
        this.showLoader = false;
      }
    });
  }

  openArchiveDialog(ev) {
    let vm = this;
    console.log(angular.element(document.querySelector('#openArchiveDialog')));
    var confirm = this.mdDialog.confirm()
      .parent(angular.element(document.body))
      .clickOutsideToClose(true)
      .title('В архив')
      .textContent('Закрыть сделку и перенести объект в архив?')
      .ariaLabel('Object archivation confirmation')
      .ok('Переместить')
      .cancel('Нет')
      .targetEvent(ev);
    this.mdDialog.show(confirm).then(function () {
      vm.realty.status = 'archive';

      vm.realtyUpdate();

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
  OneInfoEdit,
  Loader
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/one-info/one-info.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: OneInfo
});

