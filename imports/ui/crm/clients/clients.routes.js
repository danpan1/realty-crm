/* @ngInject */
export default function routes($stateProvider) {

  $stateProvider
    .state('crm.clients', {
      url: '/clients',
      template: '<clients/>'
    })

  .state('crm.clients.add', {
    url: '/add',
    template: '<add-client/>'
  });
}
