var app = angular.module('usbddApp');

app.filter('getDisks', function () {
    return function (data) {        
        if (angular.isUndefined(data))
            return [];        
        var group = [];;        
        angular.forEach(data,function(item){
            /**check is the device is type disk and removable*/
            if((item.type==="disk" && item.rm==1) || item.name.indexOf("mmc")>-1){
                group.push(item);
            }
        });        
        return group;
    }
});

app.filter('gigas', function() {
    return function(bytes) {
        if (bytes === 0) { return 0 }
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return NaN;
        return Math.round((bytes/(Math.pow(1000,3))));
    }
});