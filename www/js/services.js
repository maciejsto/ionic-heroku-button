angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
}).factory('MqttSocket', function($rootScope) {

    var service = {};
    var client = {};

    service.connect = function(host, port, user, password) {
        var options = {
          username: user,
          password: password
        };
        console.log("Try to connect to MQTT Broker " + host + " with user " + user);
        client = mqtt.createClient(parseInt(port),host,options);
        client.subscribe(user+"/#"); 

        client.on('error', function(err) {
            console.log('error!', err);
            client.stream.end();
        });

        client.on('message', function (topic, message) {
          service.callback(topic,message);
        });
    }

    service.publish = function(topic, payload) {
        client.publish(topic,payload, {retain: true});
        console.log('publish-Event sent '+ payload + ' with topic: ' + topic + ' ' + client);
    }

    service.onMessage = function(callback) {
        service.callback = callback;
    }

    return service;
    
}).factory('Sockets', function($http, socketFactory){

  var myIoSocket = io.connect("https://agile-depths-47399.herokuapp.com/");

  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;

});
