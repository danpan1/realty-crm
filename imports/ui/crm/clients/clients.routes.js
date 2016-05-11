/* @ngInject */
export default function routes($stateProvider) {

  $stateProvider
    .state('crm.clients', {
      url: '/clients',
      template: '<clients/>'
    })
    .state('crm.clients.list', {
      // url: '/clients',
      template: '<ui-view/>',
      abstract:true
    })

    .state('crm.clients.add', {
      url: '/add',
      template: '<add-client/>'
    })
    .state('crm.clients.list.my', {
      url: '/my?:status',
      template: '<list-my-clients/>',
      controller: function ($state, $stateParams) {}
    })
    .state('crm.clients.list.hot', {
      url: '/hot',
      template: '<list-hot-clients/>'
    });
}
