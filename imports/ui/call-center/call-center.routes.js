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
    });
}
