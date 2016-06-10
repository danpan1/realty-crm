/**
 * Created by Danpan on 06.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Clients} from '/imports/api/clients';
import {dictionary} from '/imports/helpers/dictionary';

import './client-analytics.view.html';

class ClientAnalytics {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams, $timeout) {
    $reactive(this).attach($scope);
    var vm = this;
    this.$timeout = $timeout;
    //this.client = Clients.findOne({_id: $stateParams.client});
    this.dictionary = dictionary;

    vm.helpers({
      client: () => {
        return Clients.findOne({_id: $stateParams.client});
      }
    });
    
    let subwaysEmb = this.client.need.embedded.subways.map((value) => { return value.name; });
    
    Meteor.call('clientAnalytics', this.client.need.price, this.client.need.roomcount, subwaysEmb, this.client.need.renovation, (err, result) => {
      this.loaded = false;
      if (err) {
        console.log('err: ' + err);
      } else {
        this.$timeout(()=>{
          console.log(result);
          this.analytics = result.map((item) => {
            let isAvgMore = item.avgPrice > this.client.need.price;
            let difference = isAvgMore ? parseInt(item.avgPrice - this.client.need.price) : parseInt(this.client.need.price - item.avgPrice);
            return {
              _id:{
                roomcount: item._id.roomcount,
                subways: item._id.subways,
                subwaysLine: item._id.subwaysLine
              },
              avgPrice: parseInt(item.avgPrice),
              maxPrice: parseInt(item.maxPrice),
              minPrice: parseInt(item.minPrice),
              totalRealty: item.totalRealty,
              isAvgMore: isAvgMore,
              difference: difference
            }
          });
          this.loaded = true;
          /*this.analytics.avgPrice = result.map((item) => {return parseInt(item)})[0];
          this.analytics.comparison = this.analytics.avgPrice > this.realty.price;
          this.analytics.difference = this.analytics.comparison ? this.analytics.avgPrice - this.realty.price : this.realty.price - this.analytics.avgPrice;
          this.analytics.marketOk = !this.analytics.comparison && this.analytics.difference > this.analytics.avgPrice / 10 ? 'Цена слишком высокая' : this.analytics.comparison && this.analytics.difference > this.analytics.avgPrice / 10 ? 'Цена слишком низкая' : 'Цена в рынке!';*/
        })
      }
    });
    
  }
}

const moduleName = 'clientAnalytics';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/clients/client-details/client-analytics/client-analytics.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: ClientAnalytics
});

