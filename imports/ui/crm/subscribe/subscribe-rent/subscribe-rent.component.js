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
    this.monthSegments = helpers.monthSegments;

    
    Meteor.call('checkSubscribe', (err, res) => {
      if (err) {
        console.log('==== insertSubscribe ERROR', err);
      } else {
        console.log(res.rent);
        if (res.rent) {
          for(let property in res.rent) {
            console.log(property);
            for(let segment of this.monthSegments){
              if (segment.name == property) segment.disabled = true;
            }
          }
        }
      }
    });


  }

  onFillBalance () {
    console.log(this.fillBalance);
  }

  onCountCost () {
    let price = 0;
    for (let segment of this.monthSegments) {
      if (segment.subscribed) price += segment.subscribePrice;
    }
    this.fullCost = price;
  }

  onBalanceCount () {
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
      if (segment.subscribed) {
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
  
