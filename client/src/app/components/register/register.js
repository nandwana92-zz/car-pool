import template from './register.html';

export const register = {
  bindings: {},
  template,
  controller: class register {
    /** @ngInject */
    constructor($state, $timeout, $mdToast, authService) {
      this.$timeout = $timeout;
      this.$mdToast = $mdToast;
      this.$state = $state;
      this.authService = authService;
      this.isLoading = false;
      this.user = {
        fullName: '',
        emailId: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
        carModel: ''
      };
    }
    $onInit() {}
    register() {
      this.isLoading = true;

      this.$timeout(() => {
        this.authService.register(this.user).then(() => {
          const toast = this.$mdToast
            .simple()
            .textContent('Registered Successfully!');

          this.$mdToast.show(toast);
          this.isLoading = false;
          this.$state.go('login');
        });
      }, 1000);
    }
  }
};
