export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('crm', {
      abstract: true,
      template: '<layout layout="column" flex tabIndex="-1" role="main"/>'
    })
  // Пока тут пусто. Может здесь будет layout индивидуальны. Danpan
}
