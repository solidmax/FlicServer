
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
/*
var net = require('net');
var sockets = [];
 */
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//eventos para la pagina web
io.on('connection', function(socket){
    console.log("connection");    
    io.emit("welcome","Bienvenido al servidor!");


    socket.on('NewLatLong', function(latLong){
        console.log("NewLatLong received: "+latLong);
        
        io.emit('NewLatLong', latLong);
    });

    socket.on('message',function(data){
        console.log("New message received: "+data);
    });
    socket.on('id',function(data){
        console.log("New message from "+data);
    });
});


http.listen(port, function(){
    console.log("escuchando puerto %d",port);
});
