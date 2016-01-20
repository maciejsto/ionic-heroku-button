var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    exec = require('child_process').exec,
    util = require('util'),
    mqtt = require('mqtt'), 
    url = require('url');

//serve our code
app.use(express.static('www'));
// app.use(express.json());
// app.use(express.urlencoded());
//listening on connections

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// API Routes
// app.get('/blah', routeHandler);

app.set('port', process.env.PORT || 5000);


// MQTT
// Parse 
var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
var auth = (mqtt_url.auth || ':').split(':');

// Create a client connection
var client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
  username: auth[0],
  password: auth[1] 
});

client.on('connect', function() { // When connected

  // subscribe to a topic
  client.subscribe('hello/world', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });

  // publish a message to a topic
  client.publish('hello/world', 'my message', function() {
    console.log("Message is published");
    client.end(); // Close the connection when published
  });
});



io.on('connection', function (socket) {
    console.log('client connected!'); 
    socket.on('message', function(data){
        console.log(data);
    });
    socket.on('LightHall', function(data){
        console.log(data);
    });
    socket.on('slider', function(data){
        console.log(data);
    });
    socket.on('LightKitchen', function(data){
        console.log(data);
    });
});

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
// app.listen(app.get('port'), function () {
//     console.log('Express server listening on port ' + app.get('port'));
// });



