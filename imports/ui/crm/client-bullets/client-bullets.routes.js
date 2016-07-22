/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('crm.client-bullets', {
      url: '/client-bullets',
      template: '<client-bullets/>'
    })
    .state('crm.client-bullets.change', {
      url: '/change?:number',
      template: '<client-bullets-change/>',
      controller: function ($state, $stateParams) {}
    })
    .state('crm.client-bullets.list', {
      url: '/list',
      template: '<client-bullets-list/>'
    })
}