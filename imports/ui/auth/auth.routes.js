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
    })
    .state('auth.register', {
      url: '/register',
      template: '<register/>'
    })
    .state('auth.resetpw', {
      url: '/resetpw',
      template: '<resetpw/>'
    });
}
