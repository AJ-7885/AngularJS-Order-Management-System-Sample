/*! Author : AJ @MavajSunCo 12-FEB-2017 */

omsApp.controller("omsCtl", ['$scope','$http','verifyDelete','toast',
                             'showDialog','omsFactory',
     function ( $scope,$http,verifyDelete, toast,
            showDialog, omsFactory) {
                
        omsFactory.getAllUsers().then(function (respond) {
            $scope.users = respond.data;
            omsFactory.getAllOrders().then(function (respond) {
                // The ID need to be UUID from the backend, But I use integer 
                //$http.get( 'test-data/getMyProfileAccountLabels.json' )
                $scope.orders = respond.data;

                console.log($scope.users);
                console.log($scope.orders);
            });
        });
    }]);
