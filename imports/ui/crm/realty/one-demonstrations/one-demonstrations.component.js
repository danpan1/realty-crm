/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {ClientFilterQuery} from '/imports/api/client-filter-query';
import {Realty} from '/imports/api/realty';
import {dictionary} from '/imports/api/dictionary';
import './one-demonstrations.view.html';

class OneDemonstrations {

  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
    const vm = this;

    // [{"roomcount":["2","3"],"subways":["ktYzMPsmw72Sej3cQ"],"districts":["EdhyC9pQm5SHBJZcu"],
    //   "renovation":[1],"conditions":["tv","kitchen_furniture"],"metroPeshkom":12,"floorFrom":1,"floorTo":22,"priceFrom":11,
    // "priceTo":221212,"_id":"QKrX43DjMkxSjrRxR"}]

    this.subscribe('oneInfo', () => {
      return [
        $stateParams.realtyId
      ];
    }, {
      onReady(){
        let realty = Realty.findOne({});
        if (realty) {
          let conditions = dictionary.conditions.map((value)=> {
            return value.id;
          });
          var queryConditions = conditions.filter(function (value) {
            return realty.details.conditions.indexOf(value) === -1
          });
          // query = conditions: {$nin:queryConditions}
          let filterRealty = {
            roomcount: realty.roomcount,
            subways: realty.address.subways,
            districts: [realty.address.districtId, realty.address.areaId],
            renovation: realty.details.renovation,
            conditions: queryConditions,
            metroPeshkom: realty.address.metroPeshkom,
            floor: realty.floor,
            price: realty.price
          };
          vm.realty = filterRealty;
          // return filterRealty;
          console.log('ready');
          console.log(filterRealty);
          vm.subscribe('ClientFilterQueryOneDemonstration', ()=> {
            return [filterRealty];
          });
        }
      }
    });

    vm.helpers({
      // realty: () => {
      // },
      clientFilterQueries: () => {
        return ClientFilterQuery.find();
      }
    });
  }

}

const moduleName = 'oneDemonstrations';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/one-demonstrations/one-demonstrations.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: OneDemonstrations
});
