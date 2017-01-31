/*
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
*/
var net = require('net');
var sockets = [];
 
/*
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
*/

var svr = net.createServer(function(sock) {

    //Eventos para app android
    console.log('Connected: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);
 
    sock.write('Welcome to the server!\n');
 
    sock.on('data', function(data) {
        console.log('data: ' + data);
        sock.write('write: '+data+'\n');
        for (var i=0; i<sockets.length ; i++) {
            if (sockets[i] != sock) {
                if (sockets[i]) {
                    sockets[i].write(data);

                }
            }
        }
    });
 
    sock.on('end', function() {
        console.log('Disconnected: ' + sock.remoteAddress + ':' + sock.remotePort);
        var idx = sockets.indexOf(sock);
        if (idx != -1) {
            delete sockets[idx];
        }
    });
});
 
var svraddr = '192.168.0.104';
var svrport = 3000;
 
svr.listen(svrport, svraddr);
console.log('Server Created at ' + svraddr + ':' + svrport + '\n');

/*
//eventos para la pagina web
io.on('connection', function(socket){
    console.log("connection");
    socket.on('NewLatLong', function(msg){
        console.log("message received");
        io.emit('NewLatLong', msg);
    });
});


http.listen(3001, function(){
    console.log("escuchando puerto 3001");
});
*/