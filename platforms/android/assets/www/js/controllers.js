angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends, Sockets) {
  console.log(Sockets);
  Sockets.emit('message',{data: "hi node server :)"})
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})




.controller('lightControlCtrl', function($scope, Sockets) {
   var num = 0.0;
    $scope.hallModel = false;
    // $scope.qty = new Quantity(12); 
    $scope.qty = setQuantity(12);
    $scope.num = num;
    
    
    Sockets.emit('light',{data: "this is from light controller :)"})
    
    
    //function executed when toggle hall button is clicked
    $scope.toggleHall = function(){
         
         if ($scope.hallModel == false){
             $scope.hallModel = true
         }else{
             $scope.hallModel = false
         }
         console.log('----------')
        Sockets.emit('LightHall', {data: $scope.hallModel}); 
        console.log($scope.hallModel);        
    }
     //function executed when toggle hall button is clicked
    $scope.toggleKitchen = function(){
         
         if ($scope.hallModel == false){
             $scope.hallModel = true
         }else{
             $scope.hallModel = false
         }
         console.log('----------')
        Sockets.emit('LightHall', {data: $scope.hallModel}); 
        console.log($scope.hallModel);        
    }
    
    $scope.rangeSlider = function(){
        console.log($scope.qty.qty)
        Sockets.emit('slider', {data:$scope.qty.qty});
    }
    
    function setQuantity(new_quantity){
        return new Quantity(new_quantity);
    }
});

function Quantity(numOfPcs) {
    var qty = numOfPcs;
    var dozens = numOfPcs / 12;

    this.__defineGetter__("qty", function () {
        return qty;
    });

    this.__defineSetter__("qty", function (val) {        
        val = parseInt(val);
        qty = val;
        dozens = val / 12;
    });

    this.__defineGetter__("dozens", function () {
        return dozens;
    });

    this.__defineSetter__("dozens", function (val) {
        dozens = val;
        qty = val * 12;
    });
}
