var app = angular.module('usbddApp', ['ngMessages','ngMaterial','angular-electron']);
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

app.controller("mainCtrl", function($scope, exec, $filter,dialog,spawn,$interval,app,remote,Tray){

    var mainWindow = remote.getCurrentWindow();
    //mainWindow.setProgressBar(0.9,{mode:"normal"});

    const appIcon = new Tray('/home/vlima/Documents/development/electron/usbdd/app/img/usb.png');
   // mainWindow.setIcon(appIcon);


    $scope.usb = {};
    $scope.barProgress = 0;
    $scope.disableButton=false;

    $scope.loadDisks = function() {

        exec('lsblk -b -a -p --json', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }else{
                var data =  JSON.parse(stdout.toString());
                var disks = $filter('getDisks')(data.blockdevices);
                $scope.devices= disks;
                for(var i=0; i < disks.length; i++){
                    console.log($filter('gigas')(disks[i].size));
                }
            }
        });

    };

    $scope.openFile = function(){

        var opt = {};
        opt.properties = ['openFile'];
        opt.title="Choose the .iso file!";
        opt.filters= [{name: 'Iso', extensions: ['iso']}];

        $scope.usb.selectedFile = (dialog.showOpenDialog(opt))[0];
    
    };

    $scope.createBootable = function(){
        //mainWindow.setIcon(appIcon);
        if($scope.usbForm.$valid){
            $scope.disableButton=true;
            $scope.barProgress=0;

            const password = '** you password **';


            var inputFile = "if="+$scope.usb.selectedFile;
            var outputFile = "of="+$scope.usb.selectedStorage;
            const dd = spawn('sudo', ['-S','-p','password','dd',inputFile, outputFile, 'status=progress' ]);
            
            /**
             * Disk Usage by the selected file in bytes
             */
            const du = spawn('du', ['-b',"/home/vlima/Downloads/ubuntu-16.04.1-desktop-amd64.iso"]);

            var fileSize = 0;
            exec('du -b '+$scope.usb.selectedFile, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                fileSize= parseInt(stdout.toString().trim().split('\t')[0]);
                console.log("size: "+fileSize);

            });
            
            console.log($scope.usb.selectedStorage);

            dd.stderr.on('data', (data) => {
                if('password'==data.toString()){
                    console.log(true);
                    dd.stdin.write(password+"\n");
                }else{
                    //console.log(`stderr: ${data}`);
                    data = data.toString();
                    if(data.indexOf("bytes")){
                        var fields = data.split(" ");
                        /*
                            [0] = bytes transfered
                            [1] = 
                        */
                        var transferedBytes = parseInt(fields[0]);

                        if(angular.isNumber(fileSize) && angular.isNumber(transferedBytes)){
                            
                            var percent = getPercentage(fileSize,transferedBytes);
                            if($scope.barProgress < percent){
                                $scope.barProgress=percent;
                                mainWindow.setProgressBar(0.5);
                                $scope.$apply();
                            }
                            console.log("Porcentage: "+$scope.barProgress);
                        }
                    }
                }
            });

            app.on('window-all-closed', function() {
                dd.kill();
                console.log("closing app!");
            });

            dd.on('close', (code) => {
                if(parseInt(code.toString())==0){
                    $scope.barProgress=100;
                    $scope.$apply();
                    let myNotification = new Notification('Done', {
                        body: 'Finished bootable device!'
                    })

                }
                $scope.disableButton=false;
                console.log(`child process exited with code ${code}`);
            });
        }
        else{
            console.log("fill up the required fields!");
        }
    };

    function getPercentage(max,number){
        return Math.round((100/max)*number);
    }

});