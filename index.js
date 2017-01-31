var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
/*
app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params);
     res.sendFile( __dirname + req.params[0]); 
 });


app.configure(function(){
    app.use(express.static(__dirname+ "/public"));
});
*/
app.listen(3000, function(){

    console.log("escuchando puerto 3000");
});

io.on('connection', function (socket) {
    socket.send('socket send Bienvenido al servidor!!');
   // var userName;
   io.emit("io.emit entraste al servidor");
    socket.on('data', function(message){
       
        io.emit("io.emit entraste al servidor");
     /*   if(!userName) {
            userName = message;
            io.sockets.send(message + ' has entered the zone.');
            return;
        }

        var broadcastMessage = userName + ': ' + message;
        io.sockets.send(broadcastMessage);*/
    });
    socket.on('end', function() {
        //var broadcastMessage = userName + ' has left the zone.';
        console.log("el usuario se desconecto");
        var broadcastMessage = "io.socket.send Android dejo el servidor";
        io.sockets.send(broadcastMessage);
    });
});



