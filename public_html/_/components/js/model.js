/*! Author : https://github.com/AJ-7885 12-FEB-2017 */

omsApp.factory('omsFactory', ['$http', function ($http) {
        var sdo = {
            getAllOrders: function () {
                var promise = $http({
//                    url: '_/js/orders.json',
                    url: 'https://my-json-server.typicode.com/AJ-7885/AngularJS-Order-Management-System-Sample/order',
                    method: "GET"
                });
                promise.success(function (data, status, headers, conf) {
                    return data;
                });
                return promise;
            },
              getAllUsers: function () {
                var promise = $http({
                    url: 'https://my-json-server.typicode.com/AJ-7885/AngularJS-Order-Management-System-Sample/user',
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

