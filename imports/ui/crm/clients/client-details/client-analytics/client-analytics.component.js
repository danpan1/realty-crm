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
      if (err) {
        console.log('err: ' + err);
      } else {
        this.$timeout(()=>{
          console.log(result);
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

