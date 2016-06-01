export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('crm', {
      abstract: true,
      template: '<layout layout="column" flex tabIndex="-1" role="main"/>'
    })
    .state('crm.realty-new-list', {
      template: '<realty-new-list/>',
      url: `/new-realty?:search&:page&:floorFrom&:floorTo&:priceFrom&:priceTo&:conditions&:subways&:roomcount&:districts&:composition&:renovation&:metroTime&:metroTransport`,
      controller: function ($state, $stateParams) {}
    });
  // Пока тут пусто. Может здесь будет layout индивидуальны. Danpan
}
