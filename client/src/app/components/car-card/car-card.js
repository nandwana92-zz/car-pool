import template from './car-card.html';

export const carCard = {
  bindings: {
    size: '@',
    car: '=',
    selectedCar: '=',
    handleCarSelect: '&'
  },
  template,
  controller: class carCard {
    /** @ngInject */
    constructor($state) {
      this.$state = $state;
    }
    $onInit() {
      this.totalVotes = this.car.up + this.car.down;
    }
    loadcarDetails() {
      this.$state.go('car', {
        carId: this.car.id
      });
    }
    updateScore(e, vote) {
      e.stopPropagation();

      const voteToScoreMapping = {
        up: 1,
        down: -1
      };

      if (voteToScoreMapping[vote] === this.car.userScore) {
        this.car.userScore = 0;
        this.car[vote] -= 1;
      } else if (this.car.userScore === 0) {
        this.car.userScore = voteToScoreMapping[vote];
        this.car[vote] += 1;
      } else {
        this.car.userScore = voteToScoreMapping[vote];

        for (const key in voteToScoreMapping) {
          if (vote === key) {
            this.car[key] += 1;
          } else {
            this.car[key] -= 1;
          }
        }
      }
    }
  }
};
