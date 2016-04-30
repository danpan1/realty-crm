export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('auth', {
      abstract: true,
      template: '<ui-view/>'
    })
    .state('auth.login', {
      url: '/login',
      template: '<login/>'
    });
  // Пока тут пусто. Может здесь будет layout индивидуальны. Danpan
}