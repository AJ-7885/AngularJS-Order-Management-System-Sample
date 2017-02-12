/*! Author : AJ @MavajSunCo 12-FEB-2017 */

/**
 * Build main module
 * */

var omsApp = angular.module("OMS", ['ngMaterial'])
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

//            function themeController ($scope) {            
//            }	
// 
    	