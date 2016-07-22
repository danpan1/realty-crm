import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Locations} from '/imports/api/locations';
import {dictionary} from '/imports/helpers/dictionary';
import {Filters} from '/imports/api/filters'
import {name as ClientBulletsListItem} from './client-bullets-list-item/client-bullets-list-item.component';

//import {bullets} from '../client-bullets-array.js'

import './client-bullets-list.view.html';
import './buy-bullets.view.html';

class ClientBulletsList {
  /* @ngInject */
  constructor($scope, $reactive, $timeout, $mdDialog, $state) {
    $reactive(this).attach($scope);
    this.$state = $state;
    this.$timeout = $timeout;
    this.mdDialog = $mdDialog;
    const vm = this;
    this.dictionary = dictionary;
    this.bullets = [];
    
    this.autorun(function () {
      let user = Meteor.user();
      console.log('user: ', user)
      if (user) {
        vm.user = user;
        Meteor.call('findUserBullets', (err, userBullets) => {
          if (err) console.log('err:',err);
          else {
            this.$timeout( () => {
              this.bullets = userBullets;
            },100)
            /*for(var ub in userBullets){
              for (var i in this.bullets) {
                console.log(userBullets[ub].name + ' ? ' + this.bullets[i].name)
                if (userBullets[ub].name == this.bullets[i].name) {
                  this.$timeout(() => {
                    this.bullets[i].filter = userBullets[ub].filter;
                    this.bullets[i].bullet = userBullets[ub].bullet;
                    this.bullets[i].isBullet = userBullets[ub].isBullet;
                    this.bullets[i].isActive = userBullets[ub].bullet.qty > 0 ? true : false;
                    this.bullets[i]._id = userBullets[ub]._id;
                    console.log(this.bullets[i]._id);
                  },10)
                }
              }
            }*/
          }
        })

      }
    });

  }

  fillHolder (num) {
    let vm = this;

    class bulletsPurchasing {

      constructor() {
        this.bulletsQty = 5;
        this.bulletCost = vm.bullets[num].bullet.price;
      }   

      buyBullets (qty) {
        
        alert('Вы решили купить ' + qty + ' пуль');
        vm.mdDialog.cancel();
      }

      close() {
        vm.mdDialog.cancel();
      }

    }

    this.mdDialog.show({
      controller: bulletsPurchasing,
      controllerAs: 'buyBullets',
      templateUrl: 'imports/ui/crm/client-bullets/client-bullets-list/buy-bullets.view.html',
      preserveScope: true,
      clickOutsideToClose: true
    });

  }

  changeBulletActive () {

  }

  newHolder () {
    window.localStorage["changeBullet"] = undefined;
    this.$state.go('crm.client-bullets.change')
  }

  changeHolder (num) {
    
    window.localStorage["changeBullet"] = JSON.stringify(this.bullets[num], function (key, val) {
      if (key == '$$hashKey') {
        return undefined;
      }
      return val;
    });

    this.$state.go('crm.client-bullets.change')
  }

}

const moduleName = 'clientBulletsList';

// create a module
export default angular.module(moduleName, [
  angularMeteor,
  ClientBulletsListItem
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/client-bullets/client-bullets-list/client-bullets-list.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientBulletsList
});
