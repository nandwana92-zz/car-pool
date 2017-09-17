import template from './car-list.html';

export const carList = {
  bindings: {
    cars: '=',
    selectedCar: '=',
    handleCarSelect: '&'
  },
  template,
  controller: class carList {
    /** @ngInject */
    constructor() {}
    $onInit() {}
  }
};
