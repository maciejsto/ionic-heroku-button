angular.module('arduino.controller', [])



.controller('ArduinoController', function($scope, Sockets) {
    Sockets.emit('message',{data: "hi node server :)"})
    console.log('arduino controller - TODO...')
})