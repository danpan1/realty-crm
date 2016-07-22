import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {CountsDan} from '/imports/api/counts';
import {Locations} from '/imports/api/locations';
import {dictionary} from '/imports/helpers/dictionary';
import {Meteor} from 'meteor/meteor';

//import bullets from '../client-bullets-array.js'

import './client-bullets-change.view.html';

class ClientBulletsChange {
  /* @ngInject */
  constructor($scope, $reactive, $timeout, $state, $stateParams, $window) {
    $reactive(this).attach($scope);
    this.$window = $window;
    this.$timeout = $timeout;
    this.$state = $state;
    this.$stateParams = $stateParams;
    const vm = this;
    this.dictionary = dictionary;

    // После определения юзера создаем объект фильтра
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        vm.user = user;
        // if (window.localStorage["changeBullet"] != undefined && window.localStorage["changeBullet"]) {
        //   console.log(JSON.parse(window.localStorage["changeBullet"]));
        //   this.oneBullet = JSON.parse(window.localStorage["changeBullet"]);
        // } else {
        this.oneBullet = {
          filter: {},
          name: '',
          bullet: {
            qty: 5,
            dealSpeed: 1,
            type: 0,
            warhead: 0
          }
        }
        this.bulletCost();
        // }
      }
    });
  }

  bulletCost() {
    let bulletPrice = 0; // Определяем цену
    console.log(this.oneBullet.bullet.dealSpeed);
    console.log(this.oneBullet.bullet.warhead);
    switch (parseInt(this.oneBullet.bullet.dealSpeed)) {
      case 0:
        bulletPrice += 150;
        break;
      case 1:
        bulletPrice += 500;
        break;
      case 2:
        bulletPrice += 1000;
        break;
    }
    bulletPrice += this.oneBullet.bullet.warhead == 0 ? 100 : 500;
    this.oneBullet.bullet.price = bulletPrice;

    this.fullPrice = (bulletPrice + 150) * this.oneBullet.bullet.qty;

  }

  fillHolder() {
    let vm = this;

    vm.savingInProgress = true; // Disable кнопки

    //this.oneBullet.bullet.qty = 0; // Количество пуль по умолчанию

    this.oneBullet.name = `${this.oneBullet.bullet.type + 1}-к экономки `;
    this.oneBullet.name += this.oneBullet.bullet.warhead == 0 ? 'с встречей' : 'с комиссией';
    switch (parseInt(this.oneBullet.bullet.dealSpeed)) {
      case 0:
        this.oneBullet.name += ' на стандартной';
        break;
      case 1:
        this.oneBullet.name += ' на быстрой';
        break;
      case 2:
        this.oneBullet.name += ' на максимальной';
        break;
    }
    this.oneBullet.name += ' скорости';

    newfilter = {
      filter: this.oneBullet.filter,
      name: this.oneBullet.name,
      user: {
        id: this.user._id,
        phone: this.user.profile.phone
      },
      isBullet: true,
      bullet: this.oneBullet.bullet
    }
    //if (this.oneBullet._id) newfilter._id = this.oneBullet._id;
    //console.log(newfilter._id);
    // if(newfilter._id){
    //   Meteor.call('changeFilter', newfilter, (error, result) => {
    //     if (error) {
    //       console.log('Ошибка!', error);
    //       vm.savingInProgress = false;
    //       this.$state.go('crm.client-bullets.list') ;
    //     } else {
    //       vm.savingInProgress = false;
    //       this.$state.go('crm.client-bullets.list') ;
    //     }
    //   });
    // } else {
    Meteor.call('addFilter', newfilter, (error, result) => {
      if (error) {
        console.log('Ошибка!', error);
        vm.savingInProgress = false;
        this.$state.go('crm.client-bullets.list');
      } else {
        // result  - newFilter ID
        vm.buyBullets(result);
        vm.savingInProgress = false;
        this.$state.go('crm.client-bullets.list');
      }
    });
    // }

  }

  buyBullets(filterId) {
    let bullet = this.oneBullet.bullet;
    let type = 2;
    let qty = bullet.qty;
    let summ = this.fullPrice;

    console.log('Request to RoboKassa: пополнить пули ' + qty + ' rubles');
    let description = 'пополнить пули на ' + qty;
    Meteor.call('replenishTheBalance', summ, description, qty, type, filterId, (err, res)=> {
      if (err) {
        this.error = err;
        return;
      }
      console.log(res);
      this.$window.open(res, '_self');
    });
  }

}

const moduleName = 'clientBulletsChange';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/client-bullets/client-bullets-change/client-bullets-change.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientBulletsChange
});
