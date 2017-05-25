var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var pg = require('pg');

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


// Conexion de base de datos
var connectionString = "postgres://ipnsmckxjgifwn:9a7557cc5cd0f8236fdbfc468b53329c82112bdef6d0a7f08d31cd945dc3d74f@ec2-184-73-199-72.compute-1.amazonaws.com:5432/d5ahj64sjdu31q?ssl=true"

var client = new pg.Client(connectionString);
client.connect();





//eventos para la pagina web
io.on('connection', function(socket){
    console.log("connection");    
    io.emit("welcome","Bienvenido al servidor!");

    socket.on('dbQuery', function(msg){        
        var query = client.query('SELECT * FROM users', function(err, result) {
            //  done();
            if(err) return console.error(err);
            console.log("dbQuery server: "+result.rows);
            io.emit('dbQuery',result.rows);
        });    

        console.log("var query: "+query);
    });

    socket.on('dbInsert', function(newUser){
        console.log("-------------- dbInsert -------------");
        //tabla usuario: name, flicid, lat, long, flicstatus, cellstatus
        console.log("dbInsert");
        console.log("name: "+newUser.name); 
        console.log("flicid: "+newUser.flicid); 
        console.log("lat: "+newUser.lat); 
        console.log("long: "+newUser.long); 
        console.log("flicstatus: "+newUser.flicstatus); 
        console.log("cellstatus: "+newUser.cellstatus); 

        
        newUser.lat = 1.11;
        newUser.long = 2.22;
        console.log("newlat: "+newUser.lat); 
        console.log("newlong: "+newUser.long); 

        var queryString = 'INSERT INTO users (name, flicid, lat, long, flicstatus, cellstatus) VALUES (\''+newUser.name+'\',\''+newUser.flicid+'\',\''+newUser.lat+'\',\''+newUser.long+'\',\''+newUser.flicstatus+'\',\''+newUser.cellstatus+'\')';
        console.log("queryString: "+queryString);
      //var query = client.query('INSERT INTO users SET ?', newUser, function(err, result) {
      var query = client.query(queryString, function(err, result) {
//        var query = client.query('INSERT INTO users VALUES ('+newUser.name+',\"'+newUser.flicid+'\",'+newUser.lat+','+newUser.long+','+newUser.flicstatus+','+newUser.cellstatus+')', function(err, result) {            
        //var query = client.query('INSERT INTO users (name, flicid, lat, long, flicstatus, cellstatus) VALUES (${name},${flicid},${lat},${long},${flicstatus},${cellstatus})',newUser, function(err, result) {            
            if(err) return console.error(err);
            else
                console.log("------ >>>>>>>>>>> insertado: "+ result.rows);
         //   io.emit('dbQuery',result.rows);
        });    
        
    });

    socket.on('test',function(query){
        console.log("query test: "+query);
        client.query(query, function(err, result) {            
            if(err) return console.error(err);
            console.log(result.rows);
            //io.emit('dbQuery',result.rows);
        });    
    });

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
