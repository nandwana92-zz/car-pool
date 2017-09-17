import template from './book.html';

export const book = {
  bindings: {},
  template,
  controller: class book {
    /** @ngInject */
    constructor(NgMap, $timeout, $mdToast, carService) {
      this.$timeout = $timeout;
      this.$mdToast = $mdToast;
      this.NgMap = NgMap;
      this.carService = carService;
      this.isLoading = false;
      this.fetchingCars = false;
      this.noMatch = false;
      this.cars = [];
      this.rideDetails = {
        from: '',
        to: ''
      };
    }
    $onInit() {
      const $ctrl = this;

      this.NgMap.getMap().then(map => {
        this.map = map;
      });

      this.handleFromChange = function() {
        $ctrl.fromPlaceObject = this.getPlace();
        $ctrl.map.setCenter($ctrl.fromPlaceObject.geometry.location);
        $ctrl.getCars();
      };

      this.handleToChange = function() {
        $ctrl.getCars();
      };
    }
    setBounds() {
      const bounds = new google.maps.LatLngBounds();

      bounds.extend(
        new google.maps.LatLng(
          this.fromPlaceObject.geometry.location.lat(),
          this.fromPlaceObject.geometry.location.lng()
        )
      );

      bounds.extend(
        new google.maps.LatLng(
          this.selectedCar.currentCoordinates.lat,
          this.selectedCar.currentCoordinates.lng
        )
      );

      this.map.setCenter(bounds.getCenter());
      this.map.fitBounds(bounds);
    }
    getCars() {
      if (this.rideDetails.from && this.rideDetails.to) {
        this.selectedCar = null;
        this.fetchingCars = true;

        this.$timeout(() => {
          this.carService.getCars(this.rideDetails).then(response => {
            this.fetchingCars = false;
            this.cars = response.data;
            this.noMatch = this.cars.length === 0;
          });
        }, 1000);
      }
    }
    requestRide() {
      this.isLoading = true;

      this.$timeout(() => {
        this.carService.requestRide(this.selectedCar);
        const toast = this.$mdToast.simple().textContent('Booking Successful!');

        this.$mdToast.show(toast);
        this.isLoading = false;
      }, 2000);
    }
    handleCarSelect({ selectedCar }) {
      this.selectedCar = selectedCar;
      this.setBounds();
    }
  }
};
