/**
 * Created by Danpan on 10.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {dictionary} from '../../../helpers/dictionary';
import {Meteor} from 'meteor/meteor';
import {Realty} from '../../../api/realty';
import {name as Conditions} from '../conditions/conditions.component';
import {name as realtyCardPurchase} from './realty-card-purchase/realty-card-purchase.component';

import './realty-card.view.html';

class RealtyCard {
  /* @ngInject */
  constructor($scope, $reactive, $mdDialog, $timeout, $state, $rootElement) {
    $reactive(this).attach($scope);
    this.dictionary = dictionary;
    this.state = $state;
    this.timeout = $timeout;
    this.show = true;
    this.mdDialog = $mdDialog;
    var vm = this;
    
    this.contacts = {};   
    if (this.realty.status == 'connection' || this.realty.status == 'taken') this.onShowDetails(true); 

    if(this.realty.status == 'taken') this.realtyIsTaken = true;
    if (this.user) {
      this.data = {
        good_name: "ocaen_object_6mes",
        bill_first_name: this.user.profile.name,
        bill_email: this.user.emails[0].address,
        bill_phone: this.user.profile.phone,
        file_profile: "default",
        offerta_accept: "true"
      };
    }
    this.checkUserPaid(false);
    

    
    this.halfPrice = parseInt(this.realty.price / 2);
    
    if((vm.realty.operator && vm.realty.operator.oceanAdd) || (vm.realty.realtor && vm.realty.realtor.isExclusive)){
      let newTime = new Date().getTime();
      let time = (vm.realty.operator.oceanAdd - newTime) / 1000;
      let seconds = 300 + parseInt(time);
      if(seconds > 0){
        this.minutes = parseInt(seconds / 60);
        this.seconds = seconds - (this.minutes*60);
        console.log(this.minutes+':'+this.seconds);
        this.timeoutFunc = () => {
          this.timeout(()=>{
            this.seconds -= 1;
            if(this.seconds < 0) {
              this.minutes -= 1;
              this.seconds = 59;
            }
            if(this.minutes < 0) this.updateRealty(this.realty._id, 'skip');
            else this.timeoutFunc();
          },1000)
        }
        this.timeoutFunc(); 
      } else {
        if(this.realty.status != 'taken') this.updateRealty(this.realty._id, 'skip');
      }
    }

  }

  agency() {
    this.isAgent = true;
    console.log('oceanBanAgency', this.contacts.realtyPhone, this.contacts.realtyName);
    Meteor.call('oceanBanAgency', this.contacts.realtyPhone, this.contacts.realtyName);
  }

  checkImage() {
    var img = new Image();
    img.src = this.realty.image;
    let count = 0;
    let checkPhotos = () => {
      this.timeout(()=> {
        if (img.height < 10 || img.src.match(/realty_no_image.png/)) {
          this.noPhoto = true;
          this.realty.image = "/realty_no_image.png";
        } else {
          this.noPhoto = false;
          this.realty.image = img.src;
        }
        if(count < 12) {
          checkPhotos();
        }
        count++;
      },500);
    }
    checkPhotos();
  }

  agentContinue(id) {
    if (id) {
      this.objectAdded = true;
    }
    else {
      this.show = false;
    }
  }

  changeRelationType(type, realtyId, clientId, isNew) {
    Meteor.call('changeRelationTypeInClient', type, realtyId, clientId, isNew);
  }
  
  
  
  onShowDetails (justInfo) {
    if(!this.contacts.realtyPhone){
      let vm = this;
      if(!justInfo) this.loadingDetails = true;
      let realtyId = this.realty._id;
      let userId = this.user._id;
      Meteor.call('showRealtyDetails', realtyId, userId, (err, result)=> {
        if (err) {
          console.log('err: ' + err);
        } else {
          console.log(result);
          this.timeout(()=> {
            vm.contacts.realtyPhone = result.phone;
            vm.contacts.realtyName = result.name;
            vm.contacts.realtyStreet = result.address.street;
            vm.contacts.realtyHouse = result.address.house;
            if(!justInfo) {
              this.loadingDetails = false;
              this.ngShowDescr = true;
            }
          }, 0);
        }
      });
    } else {
      this.ngShowDescr = !this.ngShowDescr;
    }
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
                            <h3 class="md-subhead text-center">Вы уверены, что хотите отказаться от этого объекта? Вы не сможете вернуться к работе с ним в дальнейшем.</h3>
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
  
  saveCheckedRealty(id, goToObject){
    console.log('saveCheckedRealty');
    this.updateRealty(id, 'realtor', goToObject);
  }

  sendRealtyRelation(realtyId, clientId) {
    let vm = this;
    console.log(realtyId, 'realtyId');
    console.log(this.clientId, 'clientId');
    Meteor.call('setRelationFindRealty', this.clientId, realtyId, this.realtylisttype);
  }

  updateRealty(id, status, add) {
    Meteor.call('updateRealty', id, status, add, (err, result)=> {
      if (err) {
        console.log('err: ' + err);
      } else {
        if (add == 'clearRelations') this.clearRelations(id, this.clientId);
        if (add == 'go') this.state.go('crm.realty.one.review', {realtyId: id}); else if (this.ngShowDescr) this.ngShowDescr = false;
      }
    });
  }

  clearRelations (id, clientId) {
    Meteor.call('clearRelations', id, clientId, (err, result)=> {
      if (err) console.log('err: ' + err); else console.log(result);
    });
  }
  
  checkUserPaid (ev) {
    this.isUserPaid = false;

    if (this.user && this.user.roles){
      if(this.user.roles.indexOf('paid') !== -1 && this.realty.type === 4) {
        this.isUserPaid = true;
      }
      if(this.user.roles.indexOf('paidSale') !== -1 && this.realty.type === 1) {
        this.isUserPaid = true;
      }
    }

    if (!this.isUserPaid && ev) {
      this.openPurchaseStart(ev);
      return false;
    } 
    else return true;
  }
  

  showSlider () {
    if (!this.noPhoto) {
      this.slider({'images': this.realty.details.images});
    }
  }
}


const moduleName = 'realtyCard';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  realtyCardPurchase,
  Conditions
]).component(moduleName, {
  templateUrl: 'imports/ui/shared/realty-card/realty-card.view.html',
  bindings: {
    realty: '<',
    slider: '&',
    relationType: '@',
    clientId: '<',
    realtylisttype: '@',
    user: '<'
  },
  controllerAs: moduleName,
  controller: RealtyCard
});
