export default function run($rootScope, $state) {
  'ngInject';
  console.log("dfsdf");
  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if(error === 'AUTH_REQUIRED') {
        $state.go('parties');
      }
    }
  );
}