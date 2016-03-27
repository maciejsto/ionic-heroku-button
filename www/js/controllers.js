"use strict";
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Sockets) {
    Sockets.emit('message',{data: "hi node server :)"})
    console.log('dash-controller - TODO...')
})

.controller('FriendsCtrl', function($scope, Friends, Sockets) {
  Sockets.emit('message',{data: "hi node server :)"})
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends, Sockets) {
    Sockets.emit('message',{data: "hi node server :)"})
  console.log('friend-cotroller - TODO...')
  $scope.friend = Friends.get($stateParams.friendId);
  
})

.controller('AccountCtrl', function($scope, Sockets) {
    Sockets.emit('message',{data: "hi node server :)"})
    console.log('account-controller - TODO...')
})

.controller('temperatureCtrl', function($scope,$sanitize, Sockets) {
    
    var vm = this;
    
    vm.arduinotemperature = 0;
    vm.arduinohumidity    = "";
    vm.arduinolightsensor = "";
    
   
    Sockets.emit('subscribe',{topic:'Arduino/temp'});
    Sockets.on('mqtt', function (msg) {
            console.log(msg.topic+' '+msg.payload);
            vm.arduinotemperature = msg.payload;
            
    });
        
})

.controller('lightControlCtrl', function($scope, Sockets, MqttSocket) {
    
    var num = 0.0;
    
    
    $scope.hallModel       = false;
    $scope.kitchenModel    = false;
    $scope.bedRoomModel    = false;
    $scope.livingRoomModel = false;
    $scope.bathRoomModel   = false;
    
    
    
    
    
    $scope.hallSliderQty       = setQuantity(12);
    $scope.kitchenSliderQty    = setQuantity(30);
    $scope.bedRoomSliderQty    = setQuantity(45);
    $scope.livingRoomSliderQty = setQuantity(60);
    $scope.bathRoomSliderQty   = setQuantity(90);
    
    $scope.num = num;
    
    // var toggle = new Toggle('toggle');
    // var toggleHall = new ToggleHall('hall');
    
    
    // 1 function executed when toggle hall button is clicked /////////////////////////////////////
    
    $scope.toggleHall = function(){
        
         if ($scope.hallModel == false){
             $scope.hallModel = true
         }else{
             $scope.hallModel = false
         }
         

         
        Sockets.emit('publish', {topic:"light/hall",payload: $scope.hallModel});//JSON.stringify({
            //name:'hall',
            //type:'light',
            //value: $scope.hallModel
        //})
        //});
        
        Sockets.on('mqtt', function (msg) {
            console.log(msg.topic+' '+msg.payload);
            
        })
        // Sockets.emit('subscribe',{topic:'light/hall'});
        
        /*
=======
         Sockets.emit('publish', { topic: "led", payload: $scope.hallMode });
         Sockets.on('mqtt', function (msg) {
             console.log(msg.topic + ' ' + msg.payload);
         })
         Sockets.emit('subscribe', { topic: 'led' });

        /*

>>>>>>> Stashed changes
        Sockets.emit('LightHall', {
            name: "Hall",
            type: "Light",
            value: $scope.hallModel
        });
<<<<<<< Updated upstream
=======
        
>>>>>>> Stashed changes
        */
        
        // MqttSocket.publish('home/config',$scope.hallModel, function(){
        //     console.log('mqtt message published');
            
        // });
    };
     // 2 function executed when toggle hall button is clicked////////////////////////////////////
    $scope.toggleKitchen = function(){
         if ($scope.kitchenModel == false){
             $scope.kitchenModel = true
         }else{
             $scope.kitchenModel = false
         }
         
        Sockets.emit('publish', {topic:"light/kitchen",payload:$scope.kitchenModel});
        
        /*
        Sockets.emit('LightKitchen', {
            name: 'Kitchen',
            type: 'light',
            value: $scope.kitchenModel
            
        }); 
        */
    };
    
     // 3 function executed when toggle hall button is clicked//////////////////////////////////
    $scope.toggleBedRoom = function(){
         if ($scope.bedRoomModel == false){
             $scope.bedRoomModel = true
         }else{
             $scope.bedRoomModel = false
         }
        
         Sockets.emit('publish', {topic:"light/bedRoom",payload:$scope.bedRoomModel}); 
        /* 
        
        Sockets.emit('LightBedRoom', {
            name: 'bedRoom',
            type: 'light',
            value: $scope.bedRoomModel
            
        });
        */
    };
     // 4 function executed when toggle hall button is clicked//////////////////////////////////
    $scope.toggleLivingRoom = function(){
         if ($scope.livingRoomModel == false){
             $scope.livingRoomModel = true
         }else{
             $scope.livingRoomModel = false
         }
          Sockets.emit('publish', {topic:"light/livingRoom",payload:$scope.livingRoomModel});
          
          /*
        Sockets.emit('LightLivingRoom', {
            name: 'livingRoom',
            type: 'light',
            value: $scope.livingRoomModel
            
        }); 
        */
    };
     // 5 function executed when toggle hall button is clicked//////////////////////////////////
    $scope.toggleBathRoom = function(){
         if ($scope.bathRoomModel == false){
             $scope.bathRoomModel = true
         }else{
             $scope.bathRoomModel = false
         }
         
          Sockets.emit('publish', {topic:"light/bathRoom",payload:$scope.bathRoomModel});
          
          /*
        Sockets.emit('LightBathRoom', {
            name: 'bathRoom',
            type: 'light',
            value: $scope.bathRoomModel
            
        }); 
        */
    };
    // $scope.toggleKitchen = new ToggleLight('kitchen');
    
    $scope.HallRangeSlider = function(){
        
        //  Sockets.emit('publish', {topic:"light/hallSlider",payload:JSON.stringify({
        //     name:'hallSlider',
        //     type:'slider',
        //     value: $scope.hallSliderQty.qty
        // })
        // });
         Sockets.emit('publish', {topic:"light/hallSlider",payload:$scope.hallSliderQty.qty});
        
        
        
        // Sockets.emit('hallSlider', {
        //   name: 'hallSlider',
        //   type: 'slider',
        //   value:$scope.hallSliderQty.qty
        // });
    };
    
    $scope.KitchenRangeSlider = function(){
        
        Sockets.emit('publish', {topic:"light/kitchenSlider",payload:$scope.kitchenSliderQty.qty});
        /*
      Sockets.emit('kitchenSlider', {
        name: 'kitchenSlider',
        type: 'slider',
        value:$scope.kitchenSliderQty.qty
        
      });
      */
    };
    
    $scope.BedRoomRangeSlider = function(){
        
        Sockets.emit('publish', {topic:"light/bedRoomSlider",payload:$scope.bedRoomSliderQty.qty});
        /*
      Sockets.emit('bedRoomSlider', {
        name: 'bedRoomSlider',
        type: 'slider',
        value:$scope.bedRoomSliderQty.qty
      });
      */
    };
    
    $scope.LivingRoomRangeSlider = function(){
        
        Sockets.emit('publish', {topic:"light/livingRoomSlider",payload:$scope.livingRoomSliderQty.qty});
        
        /*
      Sockets.emit('livingRoomSlider', {
        name: 'livingRoomSlider',
        type: 'slider',
        value:$scope.livingRoomSliderQty.qty
      });
      */
    };
    
    $scope.BathRoomRangeSlider = function(){
        
        Sockets.emit('publish', {topic:"light/bathRoomSlider",payload:$scope.bathRoomSliderQty.qty});
        
        /*
      Sockets.emit('bathRoomSlider', {
        name: 'bathRoomSlider',
        type: 'slider',
        value:$scope.bathRoomSliderQty.qty
        
      });
      */
    };
    
    //private function
    function setQuantity(new_quantity){
        return new Quantity(new_quantity);
    };
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




// function Toggle(type){
//   if (null == type || 0 == type.length) {
//       console.log('could not create object');
//       return;
//   }
//   this.type = type;
//   this.toString = function(){
//       console.log('toggle type is: ' + this.type);
//   }
  
// };
// Toggle.prototype.toggleButton = function(){
//     console.log('toggle button');
// }

// function ToggleHall(name){
//     Toggle.call(this, name);
// }
// ToggleHall.prototype.toggleButton = function(){
//     console.log('toggle hall button');
// }




// var BaseTogglePrototype = function(){
  
//   //private function
//   function toggle(){
//     console.log('base toggle');
//   }
  
//   return {
//     toggle: toggle,
//   }
// }


