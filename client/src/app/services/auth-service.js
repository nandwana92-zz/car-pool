export default class authService {
  /** @ngInject */
  constructor($http) {
    this.$http = $http;
    this.isAuthenticated = false;
  }
  getAuthenticationStatus() {
    return this.isAuthenticated;
  }
  login({ username, password }) {
    return this.$http
      .get(
        `http://localhost:8000/login?username=${username}&password=${password}`
      )
      .then(response => {
        this.isAuthenticated = true;
        return response;
      });
  }
  register(userData) {
    return this.$http
      .post('http://localhost:8000/register', userData)
      .then(response => {
        return response;
      });
  }
}
