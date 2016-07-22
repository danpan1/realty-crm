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
    .state('auth.register-photo', {
      url: '/register-photo',
      template: '<register-photo/>'
    })
    .state('auth.change-photo', {
      url: '/change-photo',
      template: '<change-photo/>'
    })
    .state('auth.resetpw', {
      url: '/resetpw',
      template: '<resetpw/>'
    });
}
