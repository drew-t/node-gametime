var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index2.html');
// });

io.on('connection', function(socket){
  console.log(socket.client.id);
  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message', msg);
  });
});

io.listen(PORT);

// http.listen(PORT, function(){
//   console.log('listening on ', PORT);
// });
