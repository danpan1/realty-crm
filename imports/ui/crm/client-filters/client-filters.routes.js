/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('crm.client-filters', {
      url: '/client-filters',
      template: '<client-filters/>'
    })
    .state('crm.client-filters.change', {
      url: '/change?:newFilter',
      template: '<client-filters-change/>',
      controller: function ($state, $stateParams) {}
    })
    .state('crm.client-filters.list', {
      url: '/list',
      template: '<client-filters-list/>'
    })
}