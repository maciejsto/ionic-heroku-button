var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    exec = require('child_process').exec,
    util = require('util'),
    mqtt = require('mqtt'), 
    url = require('url');


// app.set('domain', process.env.IP);
    app.set('port', process.env.PORT);
    // app.use(express.urlencoded());
    // app.use(express.json());
    // app.use(express.methodOverride());
    // app.use(express.compress());
    // app.use(express.responseTime());
//    app.use(cors({credentials: false}));
    app.use(function(req, res, next) {
        // res.header("Access-Control-Allow-Origin", "http://run.plnkr.co");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Credentials", true);
        next();
    });
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


// // MQTT
// // Parse 
// var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
// var client = mqtt.connect('mqtt://unnrixva:xmcM9mRlT34Y@m20.cloudmqtt.com:33512');

// var humidity = 0;
// client.on('connect', function() {
    // console.log('client connected');
// publish a message to a topic: home/flowerpot/humidity
    // client.publish('home/flowerpot/humidity', humidity, function() {
    // client.end(); // you can close the connection when published
    // });
// });
// var auth = (mqtt_url.auth || ':').split(':');

// // Create a client connection
var client = mqtt.connect('mqtt://unnrixva:xmcM9mRlT34Y@m20.cloudmqtt.com:13512');

client.on('connect', function() { // When connected
    console.log('connected');
//   // subscribe to a topic
  client.subscribe('home/config', function() {
//     // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
      
    });
  });

  // publish a message to a topic
  client.publish('home/config', 'my message', function() {
    console.log("Message is published");
    client.end(); // Close the connection when published
  });
});



io.on('connection', function (socket) {
    
    socket.on("*", function(event, data){
       console.log("reacting on any event");
       console.log(event);
       console.log(data);
    });
    
    console.log('client connected!'); 
    socket.on('message', function(data){
        console.log(data);
    });
    //1 Hall
    socket.on('LightHall', function(data){
        console.log(data);
    });
    //2 Kitchen
    socket.on('LightKitchen', function(data){
        console.log(data);
    });
    //3 BedRoom
    socket.on('LightBedRoom', function(data){
        console.log(data);
    });
    //4 LivingRoom
    socket.on('LightLivingRoom', function(data){
        console.log(data);
    });
    //5 BathRoom
    socket.on('LightBathRoom', function(data){
        console.log(data);
    });
    
    //1
    socket.on('hallSlider', function(data){
        console.log(data);
        // console.log(data.name + ' '+  data.value);
    });
    //2
    socket.on('kitchenSlider', function(data){
        console.log(data);
        // console.log(data.name + ' ' + data.value);
    });
    //3
    socket.on('bedRoomSlider', function(data){
        console.log(data);
        // console.log(data.name + ' ' + data.value);
    });
    //4
    socket.on('livingRoomSlider', function(data){
        console.log(data);
        // console.log(data.name + ' ' + data.value);
    });
    //5
    socket.on('bathRoomSlider', function(data){
        console.log(data);
        // console.log(data.name + ' ' + data.value);
    });
});



server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Express server listening on port ' + app.get('port'));
});
// app.listen(app.get('port'), function () {
//     console.log('Express server listening on port ' + app.get('port'));
// });



