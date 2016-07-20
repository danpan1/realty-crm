/**
 * Created by Danpan on 02.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Realty} from '/imports/api/realty';
import './one-review-advert.view.html';

class OneReviewAdvert {
  /* @ngInject */
  constructor($scope, $reactive, $stateParams) {

    $reactive(this).attach($scope);
    this.hardCode = [
      {
        name: 'Звонок по рекламе',
        id: '+7 (925) 111-11-11',
        cost: '65',
        descr: '2р/мин'
      },
      {
        name: 'Реклама',
        id: 'Таганская 25',
        cost: '2000',
        descr: 'Эффективная, 1-я неделя'
      },
      {
        name: 'Реклама',
        id: 'Таганская 25',
        cost: '2000',
        descr: 'Эффективная, последущая'
      },
      {
        name: 'SMS океан',
        id: 'Бабушкниы двушки',
        cost: '2',
        descr: ''
      },
      {
        name: 'Номер для рекламы',
        id: '',
        cost: '157',
        descr: ''
      }
    ];
  }
}
const moduleName = 'oneReviewAdvert';
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/realty/one-review/one-review-advert/one-review-advert.view.html',
  bindings: {
    realty: '=',
  },
  controllerAs: moduleName,
  controller: OneReviewAdvert
});

