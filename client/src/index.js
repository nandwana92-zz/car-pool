import angular from 'angular';

import 'angular-ui-router';
import routesConfig from './routes';

import carService from './app/services/car-service';
import authService from './app/services/auth-service';

import { spinner } from './app/components/spinner/spinner';
import { book } from './app/components/book/book';
import { login } from './app/components/login/login';
import { register } from './app/components/register/register';
import { carCard } from './app/components/car-card/car-card';
import { carList } from './app/components/car-list/car-list';

import 'angular-material/angular-material.css';
import './index.scss';

import 'angular-animate/angular-animate.js';
import 'angular-messages/angular-messages.js';
import 'angular-aria/angular-aria.js';
import 'angular-material/angular-material.js';
import 'ngmap/build/scripts/ng-map.js';

angular
  .module('app', ['ui.router', 'ngMap', 'ngMaterial', 'ngMessages'])
  .config(routesConfig)
  .service('carService', carService)
  .service('authService', authService)
  .component('carCard', carCard)
  .component('spinner', spinner)
  .component('book', book)
  .component('login', login)
  .component('register', register)
  .component('carList', carList)
  .directive('validatePassword', () => {
    return {
      require: 'ngModel',
      scope: {
        password: '=validatePassword'
      },
      link(scope, element, attributes, ngModel) {
        ngModel.$validators.noMatch = function(modelValue) {
          return modelValue === scope.password;
        };

        scope.$watch('password', () => {
          ngModel.$validate();
        });
      }
    };
  });
