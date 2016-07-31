import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Meteor} from 'meteor/meteor';

import * as helpers from './subscribe-rent.array.js'

import './subscribe-rent.view.html';

class SubscribeRent {
  /* @ngInject */
  constructor($scope, $reactive, $mdDialog, $timeout, $state, $stateParams) {
    $reactive(this).attach($scope);
    let vm = this;

    this.segments = helpers.segments;
    this.segments[1].qty = 25;
    this.monthSegments = helpers.monthSegments;
    this.onBalanceCount();
    //TODO переделать подсчет дефолтной суммы подписки
    this.fullCost = 1990;
    // this.onCountCost
    
    Meteor.call('checkSubscribe', (err, res) => {
      if (err) {
        console.log('==== insertSubscribe ERROR', err);
      } else {
        console.log(res.rent);
        if (res.rent) {
          for(let property in res.rent) {
            console.log(property);
            for(let segment of this.monthSegments){
              if (segment.name == property) { segment.disabled = true; segment.subscribed = true; }
            }
          }
        }
      }
    });

    this.monthSegments[1].subscribed = true;

  }

  onFillBalance () {
    console.log(this.fillBalance);
  }

  onCountCost (name, subscribed) {
    if (name == 'all' && subscribed == true) {
      for (let segment of this.monthSegments) {
        if (segment.name != 'all' && !segment.disabled) segment.subscribed = false;
      }
    } else if (name != 'all' && subscribed == true) {
      if (!this.monthSegments[3].disabled) this.monthSegments[3].subscribed = false;
    }
    let price = 0;
    for (let segment of this.monthSegments) {
      if (segment.subscribed && !segment.disabled) price += segment.subscribePrice;
    }
    this.fullCost = price;
  }

  onBalanceCount () {
    console.log(this.segments);
    let price = 0;
    for (let segment of this.segments) {
     price += segment.price * segment.qty;
    }
    this.fillBalance = price;
  }

  onSubscribe () {
    let newDate = new Date();
    let subscribe = {
      rent:{}
    }
    for(let segment of this.monthSegments) {
      if (segment.subscribed && !segment.disabled) {
        subscribe.rent[segment.name] = {
          qty: segment.owners,
          payDate: newDate,
          paid: true
        }
      }
    };
    console.log(subscribe);
    Meteor.call('insertSubscribe', subscribe, (err, res) => {
      if (err) {
        console.log('==== insertSubscribe ERROR', err);
      } else {
        console.log('==== insertSubscribe RESULT', res);
        for(let segment of this.monthSegments) {
          if (segment.subscribed) segment.disabled = true;
        };
      }
    });
  }

}

const moduleName = 'subscribeRent';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/subscribe/subscribe-rent/subscribe-rent.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: SubscribeRent
});
  
