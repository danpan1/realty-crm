export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('crm.realty', {
      abstract: true,
      url: '/realty',
      template: '<realty/>'
    })
    .state('crm.realty.new', {
      url: '/new',
      template: '<new-list/>'
    });
}