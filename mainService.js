var express = require('express');
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var net = require('net');


var netServer = net.createServer(function(c) {
  console.log('client connected');

  c.on('end', function() {
    console.log('client disconnected');
  });

  c.write('hello\r\n');
  c.pipe(c);
});

// main service listing to any service connection on port 8124
netServer.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
});

app.use(express.static(__dirname+'/static'));

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
server.listen(3001);