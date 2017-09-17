import template from './login.html';

export const login = {
  bindings: {},
  template,
  controller: class login {
    /** @ngInject */
    constructor($state, $timeout, $mdToast, authService) {
      this.$timeout = $timeout;
      this.$mdToast = $mdToast;
      this.$state = $state;
      this.authService = authService;
      this.isLoading = false;
      this.user = {
        username: '',
        password: ''
      };
    }
    $onInit() {}
    login() {
      this.isLoading = true;

      this.$timeout(() => {
        this.authService.login(this.user).then(
          () => {
            const toast = this.$mdToast
              .simple()
              .textContent('Login Successful!');

            this.$mdToast.show(toast);
            this.isLoading = false;
            this.$state.go('book');
          },
          () => {
            const toast = this.$mdToast
              .simple()
              .theme('error-toast')
              .textContent('Login Failed!');

            this.$mdToast.show(toast);
            this.isLoading = false;
          }
        );
      }, 1000);
    }
  }
};
