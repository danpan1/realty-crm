export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('crm', {
      abstract: true,
      template: '<layout layout="column" flex tabIndex="-1" role="main"/>'
    })
    .state('crm.realty-new-list', {
      url: `/new-realty?:search&:page&:floorFrom&:floorTo&:priceFrom&:priceTo&:conditions&:subways&:roomcount&:districts&:composition&:renovation&:metroTime&:metroTransport`,
      template: '<realty-new-list/>',
      controller: function ($state, $stateParams) {}
    })
    .state('crm.add-role', {
      url: '/add-role',
      template: '<add-role/>'
    });
 
}
