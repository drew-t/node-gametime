var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = {};

const PORT = process.env.PORT || 3000;

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index2.html');
// });

io.on('connection', function(socket){
  playerInfo(socket);
  socket.on('playerNumber', function(){
    console.log('test');
    socket.send(players[socket.client.id]);
  });
  socket.on('paddle', function(paddle){
    io.emit('paddle', (players, paddle));
  });
  socket.on('disconnect', function() {
    delete players[socket.client.id];
  });
});



io.listen(PORT);

function playerInfo(socket){
    if (socket.conn.server.clientsCount === 1){
      players[socket.client.id] = 'one';
    }
    else if (socket.conn.server.clientsCount === 2){
      players[socket.client.id] = 'two';
    }
    else if (socket.conn.server.clientsCount === 3){
      players[socket.client.id] = 'three';
    }
    else if (socket.conn.server.clientsCount === 4){
      players[socket.client.id] = 'four';
    }
    return players[socket.client.id];
}
