/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('crm.realty', {
      abstract: true,
      url: '/realty',
      template: '<ui-view/>'
    })
    .state('crm.realty.add', {
      url: '/add',
      template: '<add-realty-full/>'
    })
    .state('crm.realty.list', {
      url: '/list',
      template: '<realty-list-layout/>'
    })
    .state('crm.realty.one', {
      url: '/one/:realtyId',
      template: '<realty-one-layout/>'
    })
    .state('crm.realty.one.demonstrations', {
      url: '/demonstrations',
      template: '<one-demonstrations/>'
    })
    .state('crm.realty.one.review', {
      url: '/review',
      template: '<one-review/>'
    })
    .state('crm.realty.one.email', {
      url: '/email',
      template: '<one-email/>'
    })
    .state('crm.realty.one.info', {
      url: '/info',
      template: '<one-info/>'
    })
    .state('crm.realty.one.connections', {
      url: '/connections?:assort',
      template: '<one-connections/>',
      controller: function ($state, $stateParams) {}
    })
    .state('crm.realty.list.new', {
      url: '/new',
      template: '<new-list/>'
    })
    .state('crm.realty.list.my', {
      url: '/my?:page',
      template: '<list-my/>',
      controller: function ($state, $stateParams) {}
    })
    .state('crm.realty.list.archive', {
      url: '/archive?:page',
      template: '<list-archive/>'
    });
}