var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use('/static', express.static(__dirname + '/lib'));




const PORT = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });

http.listen(PORT, function(){
  console.log('listening on ', PORT);
});