/*! Author : AJ @MavajSunCo 12-FEB-2017 */

omsApp.controller("omsCtl", ['$rootScope','$scope','$http','$mdDialog',
    'verifyDelete','toast','showDialog','omsFactory',
    function ($rootScope,$scope,$http,$mdDialog,verifyDelete, toast,
            showDialog, omsFactory) {
                
        $scope.sortType = 'clientId'; // set the default sort type
        $scope.sortReverse = false; // set the default sort order

        $scope.loadData = function () {
            // Read order user and order list
            omsFactory.getAllUsers().then(function (respond) {
                $rootScope.users = respond.data;
                $scope.adminUser = $rootScope.users[0];
                // This is assumption of login user , 
                // because we do not have login Process , 
                // and count this as admin user to see all 
                // the orders from all users

                omsFactory.getAllOrders().then(function (respond) {
                    // The ID need to be UUID from the backend,
                    // But I use integer to make simple task
                    $scope.orders = respond.data;
                    $scope.total = 0;
                    angular.forEach($scope.orders, function (order, key) {
                        $scope.total += Number(order.price);
                    });
                });
            });
        };
        
        $scope.loadData();
        
        
           
        // create order ----------------------- 
        $scope.createOrder = function($event) {
            scope= $scope.$new();
            showDialog($event, $scope, 
            ['$rootScope','$scope', '$mdDialog', '$http', 'toast',
                function($rootScope,$scope, $mdDialog, $http, toast) {
                $scope.title = 'Create New Order';
                $scope.btn = 'Create';
                $scope.type = 'add';
               
                $scope.newOrder = {  
                    id: Math.round(Math.random()*100000000000) + 1,
                    name: '',
                    weight: '',
                    description: '',
                    price: '',
                    destination: '',
                    qty:'',
                    createDate: new Date().getDate()+'-'+(new Date().getMonth() + 1)+'-'+new Date().getFullYear(),
                    clientId: ''
                }// newOrder

                // create order by post API Call
                $scope.create = function() {
                    $http.post('http://localhost:3000/order', $scope.newOrder)
                         .success(function(data, status, headers, config) {
                            toast('The new order has been added!');
                            scope.loadData();
                            $mdDialog.cancel();
                    }); // $http
                }; // .create
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
            }], 'order.html');
        };// createOrder

        // Edit the order
        $scope.editOrDeleteOrder = function($event, oldOrder) {
            scope= $scope.$new();
            showDialog($event, $scope, 
             ['$scope', '$mdDialog', '$http', 'toast',
             function($scope, $mdDialog, $http, toast){
                $scope.title = 'Edit/Delete Order';
                $scope.btn = 'Update';
                $scope.type = 'edit';

                $scope.newOrder = oldOrder;
                // delete $scope.newOrder.rated;

                // update order API Call
                $scope.create = function() {
                    $http.put('http://localhost:3000/order/'+$scope.newOrder.id, $scope.newOrder)
                         .success(function(data, status, headers, config) {
                            toast('The order has been updated!');
                            scope.loadData();
                            $mdDialog.cancel();
                    }); // $http
                }; // Update


                $scope.remove = function () {
                    // Appending dialog to document.body to ask the user 
                    // if he/she is sure to delete the record
                    var confirm = $mdDialog.confirm()
                            .title('Are you sure to delete the order?')
                            .textContent('Order will be deleted permanently.')
                            .ariaLabel('Remove Order')
                            .targetEvent(event).ok('Yes').cancel('No');

                    $mdDialog.show(confirm).then(function () {
                        $scope.status = 'Order has been removed successfully!';
                        $http.delete('http://localhost:3000/order/' + oldOrder.id)
                                .success(function (data, status, headers, config) {
                                    // tell the user item was deleted
                                    scope.loadData();
                                    toast('Order has been removed!'); 
                                });
                    }, function () {
                        $scope.status = 'You decided to keep the order.';
                    });
                }; // remove

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };// cancel
            }], 'order.html');
        };// editOrRemoveOrder
        
//------------------------------------------------------------------------------
     // Edit the user
        $scope.editUser = function($event, oldUser) {
            showDialog($event, $scope, 
             ['$scope', '$mdDialog', '$http', 'toast',
             function($scope, $mdDialog, $http, toast){
                $scope.title = 'Edit User';
                $scope.newUser = oldUser;

                // update User API Call
                $scope.update = function() {
                    $http.put('http://localhost:3000/user/'+$scope.newUser.id, $scope.newUser)
                         .success(function(data, status, headers, config) {
                            toast('The user has been updated!');
                            $mdDialog.cancel();
                    }); // $http
                }; // Update
                
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };// cancel
            }], 'user.html');
        };// editUser
        
         // Logout
        $scope.logout = function($event){
            console.log('The user logout process!!!');
        };

}]);
