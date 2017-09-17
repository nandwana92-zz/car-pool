export default class carService {
  /** @ngInject */
  constructor($http, $log) {
    this.$http = $http;
    this.$log = $log;
  }
  getCars({ from, to }) {
    return this.$http
      .get(`http://localhost:8000/cars?from=${from}&to=${to}`)
      .then(response => {
        return response;
      });
  }
  requestRide(car) {
    this.$log.log('Ride booked successfully');
  }
}
