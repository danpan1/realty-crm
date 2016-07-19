/**
 * Created by Danpan on 23.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './profile.view.html';

class Profile {
  /* @ngInject */
  constructor($scope, $reactive) {
    $reactive(this).attach($scope);
    let vm = this;
    this.autorun(function () {
      let user = Meteor.user();
      if (user) {
        vm.user = user;
        if(!vm.user.profile.advertPhone){
          vm.user.profile.advertPhone = '';
        }
        if(!vm.user.profile.advertEmail){
          vm.user.profile.advertEmail = '';
        }
      }
    });

    this.fake = true;

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
    ]

  }

  saveInfo () {
    Meteor.call('updateClientInfo', this.user, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    })
  }

}

const moduleName = 'profile';

// create a module
export default angular.module(moduleName, [
  angularMeteor
]).component(moduleName, {
  templateUrl: 'imports/ui/crm/profile/profile.view.html',
  bindings: {},
  controllerAs: moduleName,
  controller: Profile
})
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('crm.profile', {
      url: '/profile',
      template: '<profile/>'
    });
}
