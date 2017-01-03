/**
 * @author Vitor Silva Lima
 * created on 07/10/2016
 */
(function () {
  'use strict';

    var app = angular.module('usbddApp.controllers');

    app.controller('DialogController',
    
    function($scope, $mdDialog) {

        $scope.answer = function(answer) {
            if($scope.password!=undefined && $scope.password!=""){
                 $mdDialog.hide(answer);
            }else{
                console.log("User must enter the password!");
            }
        };
        
    });
   

})();