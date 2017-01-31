var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var net = require('net');

var HOST = '192.168.0.104';
var PORT = 3000;

var latitude;
var longitude;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    client.write('I am Chuck Norris!');

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    
    console.log('DATOS: ' + data);
    // Close the client socket completely
   // client.destroy();
    
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});



http.listen(3001, function(){
    console.log("escuchando puerto 3001");
});