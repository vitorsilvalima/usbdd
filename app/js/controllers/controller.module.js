/**
 * @author Vitor Silva Lima
 * created on 07/10/2016
 */
(function () {
  'use strict';

    var app = angular.module('usbddApp.controllers', []);

    app.config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		/*$stateProvider
		.state('transaction-cards', {
			url: '/transaction-cards/:date',
			templateUrl: 'app/pages/transaction-cards/transaction-cards.html',
			controller:'transaction-cards-controller'
		});*/
	}
   
})();