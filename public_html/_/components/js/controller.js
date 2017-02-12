/*! Author : AJ @MavajSunCo 12-FEB-2017 */

omsApp.controller("omsCtl", ['$scope','$http','$mdDialog','verifyDelete','toast',
                             'showDialog','omsFactory',
     function ( $scope,$http,$mdDialog,verifyDelete, toast,
            showDialog, omsFactory) {
                
        $scope.sortType = 'clientId'; // set the default sort type
        $scope.sortReverse = false; // set the default sort order
         
        // Read order user and order list
        omsFactory.getAllUsers().then(function (respond) {
            $scope.users = respond.data;
            omsFactory.getAllOrders().then(function (respond) {
                // The ID need to be UUID from the backend,
                // But I use integer to make simple task
                $scope.orders = respond.data;

                console.log($scope.users);
                console.log($scope.orders);
            });
        });
           
    // create order ----------------------- 
    $scope.createOrder = function($event) {
        showDialog($event, $scope, 
        ['$scope', '$mdDialog', '$http', 'toast',
            function($scope, $mdDialog, $http, toast) {
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
                $http.post('URL______', $scope.newOrder)
                     .success(function(data, status, headers, config) {
                        toast('The new cinema item has been added!');
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
        showDialog($event, $scope, 
         ['$scope', '$mdDialog', '$http', 'toast',function($scope, $mdDialog, $http, toast) {
            $scope.title = 'Edit/Delete Order';
            $scope.btn = 'Update';
            $scope.type = 'edit';

            $scope.newOrder = oldOrder;
            // delete $scope.newOrder.rated;

            // update order delete API Call
            $scope.create = function() {
                $http.post('URL_____', $scope.newOrder)
                     .success(function(data, status, headers, config) {
                        toast('The new order has been updated!');
                        $mdDialog.cancel();
                }); // $http
            }; // Update
            
            
            $scope.remove = function () {
                // Appending dialog to document.body to ask the user if he/she is sure to delete the record
                var confirm = $mdDialog.confirm()
                        .title('Are you sure to delete the order?')
                        .textContent('Order will be deleted permanently.')
                        .ariaLabel('Remove Order')
                        .targetEvent(event).ok('Yes').cancel('No');

                $mdDialog.show(confirm).then(function () {
                    $scope.status = 'Order has been removed successfully!';
                    $http.post('URL______' + oldOrder.id)
                            .success(function (data, status, headers, config) {
                                toast('Order has been removed!'); // tell the user item was deleted
                            });
                }, function () {
                    $scope.status = 'You decided to keep your record.';
                });
            }; // remove

            $scope.cancel = function() {
                $mdDialog.cancel();
            };// cancel
        }], 'order.html');
    };// editRemoveOrder
}]);
