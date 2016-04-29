export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('crm.realty', {
      abstract: true,
      url: '/realty',
      template: '<ui-view/>'
    })
    .state('crm.realty.list', {
      url: '/list',
      template: '<realty-list-layout/>'
    })
    .state('crm.realty.one', {
      url: '/one',
      template: '<realty-one-layout/>'
    })
    .state('crm.realty.list.new', {
      url: '/new',
      template: '<new-list/>'
    })
    .state('crm.realty.list.inWork', {
      url: '/inwork',
      template: '<in-work-list/>'
    });
}
