/**
 * Created by Danpan on 29.04.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import {name as PaginationButtons} from '/imports/ui/shared/pagination-buttons/pagination-buttons.component';
import {name as Conditions} from '/imports/ui/shared/conditions/conditions.component';

import {Realty} from '/imports/api/realty';
import {Counts} from 'meteor/tmeasday:publish-counts';
import './list-my.view.html';

class ListMy {
  /* @ngInject */
  constructor($scope, $reactive, $state, $stateParams, $timeout, $mdDialog) {
    $reactive(this).attach($scope);
    const vm = this;
    this.$timeout = $timeout;
    this.mdDialog = $mdDialog;
    this.state = $state;
    this.stateParams = $stateParams;
    vm.perPage = 20;
    vm.page = this.stateParams.page ? parseInt(this.stateParams.page) : 1;
    vm.sort = {
      'price': -1
    };

    vm.subscribe('listMy', () => {
      vm.loaded = false;
      return [
        {
          limit: parseInt(vm.perPage),
          skip: parseInt((vm.getReactively('page') - 1) * vm.perPage),
          sort: vm.getReactively('sort')
        }
      ];
    }, {
      onReady: function () {
        vm.$timeout(()=>{
          vm.loaded = true;
        },100)  
        // subscriptionHandle.stop();  // Stopping the subscription, will cause onStop to fire
      }
    });

    vm.helpers({
      realty: () => {
        return Realty.find(
          // {status: {$in: ['sale']}},
          {status: {$in: ['sale', 'taken', 'realtor']}},
          {sort: vm.sort});
      },
      realtyCount: () => {
        return Counts.get('realtyCount');
      },
      pagesCount: () => {
        return Math.ceil(Counts.get('realtyCount') / this.perPage);
      }
    });
    
    vm.pageChanged = (newPageNumber) => {
      //vm.page = newPageNumber;
      this.state.go('crm.realty.list.my', {page: newPageNumber}) ;
    };

  }
  
  updateRealty(id, status, add) {
    Meteor.call('updateRealty', id, status, add, (err, result)=> {
      if (err) {
        console.log('err: ' + err);
      } else {
        if (add == 'go') this.state.go('crm.realty.one.review', {realtyId: id}); else if (this.ngShowDescr) this.ngShowDescr = false;
      }
    });
  }

returnToCallCenter (id, ev, add) {
    const vm = this;
    
    const realtyCardDialogController = function ($mdDialog) {
      this.close = () => {
        $mdDialog.cancel();
      };
      this.confirm = () => {
        vm.updateRealty(id, 'call', add);
        $mdDialog.cancel();
      };
      this.refuse = () => {
        $mdDialog.cancel();
      };
    }
    realtyCardDialogController.$inject = ['$mdDialog'];

    this.mdDialog.show({
      controller: realtyCardDialogController,
      controllerAs : 'dialog',
      template: `<md-dialog class="subscription-dialog" aria-label="Отказ от объекта" ng-cloak>
                    <md-toolbar>
                      <div class="md-toolbar-tools">
                        <h2>Отказ от объекта</h2>
                        <span flex></span>
                        <md-button class="md-icon-button" ng-click="dialog.close()">
                          <md-icon md-svg-src="svg/icon-close.svg" aria-label="Закрыть окно оплаты подписки"></md-icon>
                        </md-button>
                      </div>
                    </md-toolbar>
                    <md-dialog-content>
                      <div class="md-dialog-content pv-16">
                        <div layout="column">
                          <div layout="row" flex="80">
                            <h3 class="md-subhead text-center">Вы не сможете вернуться к работе с ним в дальнейшем. Вы уверены, что хотите отказаться от этого объекта?</h3>
                          </div>
                          <div layout='row' layout-align='center center'>
                            <md-button flex class="md-raised md-primary md-mv-16 ph-16" ng-click='dialog.confirm()'>Да</md-button>
                            <md-button flex class="md-raised md-warn md-mv-16 ph-16" ng-click='dialog.refuse()'>Нет</md-button>
                          </div>
                        </div>
                    </md-dialog-content>
                </md-dialog>`,
      preserveScope: true,
      targetEvent: ev,
      clickOutsideToClose: true
    })
  }

  /*takeCheckedRealty(id, status) {
    Meteor.call('takeRealty', id, status, (err, result)=> {
      if (err) {
        console.log('err: ' + err);
      } else {
        console.log(result);
      }
    });
  }*/

}

const moduleName = 'listMy';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  PaginationButtons,
  Conditions
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/list-my/list-my.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ListMy
});
