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
      url: '/my',
      template: '<list-my-clients/>'
    });
}
