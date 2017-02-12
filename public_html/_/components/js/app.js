/*! Author : AJ @MavajSunCo 12-FEB-2017 */

/**
 * Build main & Global module
 * */

var omsApp = angular.module("OMS", ['ngMaterial','ngMessages'])
//        .controller('themeController', themeController)
//            .config(function($mdThemingProvider) {
//               $mdThemingProvider.theme('customTheme') 
//                  .primaryPalette('pink')
//                  .accentPalette('black')
//                  .warnPalette('gray');
//               })
                       .run(function () {
    console.log("Application has been started....!");
});

//            function themeController ($scope) { }	
    
//showDialog FACTORY for Globally use in application
omsApp.service('showDialog', ['$mdDialog',function($mdDialog) {
    // Include
    return function(ev, $scope, _Controller, temlplatrURL) {
        $mdDialog.show({
            controller : _Controller,
            templateUrl : temlplatrURL,
            parent : angular.element(document.body),
            targetEvent : ev,
            clickOutsideToClose : true,
            fullscreen : $scope.customFullscreen
     
        }).then(function(answer) {
            // $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            // $scope.status = 'You cancelled the dialog.';
        });
    }
}])// showDialog

// verifyDelete FACTORY for Globally use in application
omsApp.service('verifyDelete',['$mdDialog', function($mdDialog) {
    // Include a reference to the record object we're deleting
    return function(record) {

        // Call the confirm() function to configure the confirmation dialog
        var confirm = $mdDialog.confirm()
            .title('Confirm Your Choice')
            .content('Are you sure you want to delete the record?')
            .ariaLabel( 'Delete Record')
            .ok('Delete Record')
            .cancel('Cancel');
        return $mdDialog.show(confirm);
    }
}])// verifyDelete


// toast FACTORY for Globally use in application
omsApp.service('toast', ['$mdToast',function($mdToast) {
    // Include a reference to message which like to display
    return function(toastMessage) {
        $mdToast.show(
            $mdToast.simple()
            .textContent(toastMessage)
            .hideDelay(3000)
            .highlightAction(true)
            .highlightClass("md-warn")
            .position('bottom right')
            .capsule(true));
    }
}])// toast