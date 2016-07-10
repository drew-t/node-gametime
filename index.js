var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = {};

const PORT = process.env.PORT || 3000;

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index2.html');
// });

io.on('connection', function(socket){
  // console.log(socket.client.id);
  io.emit('player info', playerInfo(socket));
  socket.on('paddle', function(paddle){
    // console.log(msg);
    io.emit('paddle', (playerInfo(socket), paddle));
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
    console.log(players[socket.client.id]);
    return players[socket.client.id];
}
