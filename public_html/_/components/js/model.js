/*! Author : AJ @MavajSunCo 12-FEB-2017 */

omsApp.factory('omsFactory', ['$http', function ($http) {
        var sdo = {
            getAllOrders: function () {
                var promise = $http({
//                    url: '_/js/orders.json',
                    url: 'http://localhost:3000/order',
                    method: "GET"
                });
                promise.success(function (data, status, headers, conf) {
                    return data;
                });
                return promise;
            },
              getAllUsers: function () {
                var promise = $http({
                    url: 'http://localhost:3000/user',
//                    url: '_/js/users.json',
                    method: "GET"
                });
                promise.success(function (data, status, headers, conf) {
                    return data;
                });
                return promise;
            }
        };
        return sdo;
    }]);

