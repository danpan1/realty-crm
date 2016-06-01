export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('crm', {
      abstract: true,
      template: '<layout layout="column" flex tabIndex="-1" role="main"/>'
    })
    .state('crm.realty-new-list', {
      url: '/new-realty',
      template: '<realty-new-list/>'
    });
  // Пока тут пусто. Может здесь будет layout индивидуальны. Danpan
}
