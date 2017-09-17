export default routesConfig;

/** @ngInject */
function authResolve(authService, $q, $state) {
  const deferred = $q.defer();
  const isAuthenticated = authService.getAuthenticationStatus();

  if (isAuthenticated) {
    deferred.resolve();
  } else {
    deferred.reject();
    $state.go('login');
  }

  return deferred.promise;
}

/** @ngInject */
function routesConfig(
  $mdThemingProvider,
  $stateProvider,
  $urlRouterProvider,
  $locationProvider
) {
  $mdThemingProvider.theme('error-toast');
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('book', {
      url: '/',
      component: 'book',
      resolve: {
        authResolve
      }
    })
    .state('login', {
      url: '/login',
      component: 'login'
    })
    .state('register', {
      url: '/register',
      component: 'register'
    });
}
