var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  //response.render('pages/index');  
   response.sendFile(__dirname + '/index.html');
  
});


app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params);
     res.sendFile( __dirname + req.params[0]); 
 });


//eventos para la pagina web
io.on('connection', function(socket){
    console.log("connection");    
    io.emit("welcome","Bienvenido al servidor!");


    socket.on('NewLatLong', function(latLong){
        console.log("NewLatLong received: "+latLong);
        
        io.emit('NewLatLong', latLong);
    });

    socket.on('dataTest', function(clientData){
        console.log("dataTest received: "+clientData);
        
        io.emit('dataTest', clientData);
    });

    socket.on('message',function(data){
        console.log("New message received: "+data);
    });

    socket.on('id',function(data){
        console.log("New message from "+data);
    });
});


http.listen(app.get('port'), function(){
    console.log("escuchando puerto %d",app.get('port'));
});
/*
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

*/
