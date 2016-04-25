export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('crm', {
      abstract: true,
      template: '<ui-view/>'
    })
  // Пока тут пусто. Может здесь будет layout индивидуальны. Danpan
}
