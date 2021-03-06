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
    .state('crm.clients.details', {
      url: '/current',
      template: '<client-details/>',
      controller: function ($state, $stateParams) {}
    })
        // .state('crm.clients.details.relations', {
        //   url: '/relations?:client&:assort&:activetab',
        //   template: '<client-relations/>',
        //   controller: function ($state, $stateParams) {}
        // })
        // .state('crm.clients.details.suit', {
        //   url: `/suit?:client
        //              &:page
        //              &:suitby
        //              &:activetab
        //              &:floorFrom
        //              &:floorTo
        //              &:priceFrom
        //              &:priceTo
        //              &:conditions
        //              &:subways
        //              &:roomcount
        //              &:districts
        //              &:composition
        //              &:renovation
        //              &:metroTime
        //              &:metroTransport`,
        //   template: '<client-suit/>',
        //   controller: function ($state, $stateParams) {}
        // })
        // .state('crm.clients.details.analytics', {
        //   url: '/analytics?:client&:activetab',
        //   template: '<client-analytics/>',
        //   controller: function ($state, $stateParams) {}
        // })
        // .state('crm.clients.details.demonstration', {
        //   url: '/demonstration?:client&:activetab',
        //   template: '<client-demonstration/>'
        // })
        // .state('crm.clients.details.email', {
        //   url: '/email?:client&:activetab',
        //   template: '<client-email/>'
        // })
        // .state('crm.clients.details.email.send', {
        //   url: '/send?:clientId&:realtyId',
        //   template: '<one-email/>',
        //   controller: function ($state, $stateParams) {}
        // })
        .state('crm.clients.details.info', {
          url: '/info?:client&:activetab',
          template: '<client-info/>'
        })
    
    
    .state('crm.clients.list.my', {
      url: '/my?:status&:page',
      template: '<list-my-clients/>',
      controller: function ($state, $stateParams) {}
    })
    .state('crm.clients.list.hot', {
      url: '/hot',
      template: '<list-hot-clients/>'
    });
}
