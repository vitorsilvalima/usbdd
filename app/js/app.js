var app = angular.module('usbddApp', 
['ngMessages',
'ngMaterial',
'usbddApp.controllers',
'angular-electron']);


app.config(function(remoteProvider){

    /* register required modules */
    remoteProvider.register('exec', function(remote) {
        return remote.require('child_process').exec;
    });

    remoteProvider.register('spawn', function(remote) {
        return remote.require('child_process').spawn;
    });

    remoteProvider.register('Tray', function(remote) {
        return remote.require('electron').Tray;
    });


});
