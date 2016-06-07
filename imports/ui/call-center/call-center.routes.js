export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('call-center', {
      abstract: true,
      url: '/call-center',
      template: '<layout layout="column" flex tabIndex="-1" role="main"/>'
    })
    .state('call-center.incoming', {
      url: '/incoming',
      template: '<incoming-call/>'
    })
    .state('call-center.outgoing', {
      url: '/outgoing',
      template: '<outgoing-call/>'
    })
    .state('call-center.moderator', {
      url: '/moderator',
      template: '<moderator/>'
    })
    .state('call-center.otchet', {
      url: '/otchet',
      template: '<otchet/>'
    })
    .state('call-center.management', {
      url: '/management',
      template: '<management/>'
    });
}
