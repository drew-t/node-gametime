var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = {};
var paddles = {
          '1': {player: 1, x: 10, y: (800 / 3), vertical: false},
          '2': {player: 2, x: 790, y: (800 / 3), vertical: false},
          '3': {player: 3, x: 10, y: (800 / 3)*2, vertical: false},
          '4': {player: 4, x: 790, y: (800 / 3)*2, vertical: false}
};
var allPaddles = {}

const PORT = process.env.PORT || 3000;

io.on('connection', function(socket){
  playerInfo(socket);
  socket.on('initialize', function() {
    // if (socket.conn.server.clientCount > 3){
      socket.emit('initialize', players[socket.client.id]);
    // }
  });
  socket.on('paddle', function(paddle){
    paddles[paddle.player] = paddleLocation(paddle);
    // console.log(paddles);
    io.emit('paddles', (paddles));
  });
  socket.on('disconnect', function() {
    delete players[socket.client.id];
  });
});

io.listen(PORT);

function paddleLocation(paddleInfo) {
  console.log(paddleInfo.player, paddleInfo.x, paddleInfo.y, paddleInfo.vertical);
  var paddleString = {
          player: paddleInfo.player,
          x: paddleInfo.x,
          y: paddleInfo.y,
          vertical: paddleInfo.vertical
  };
  return paddleString;
}

function playerInfo(socket){
    if (socket.conn.server.clientsCount === 1){
      players[socket.client.id] = 1;
    }
    else if (socket.conn.server.clientsCount === 2){
      players[socket.client.id] = 2;
    }
    else if (socket.conn.server.clientsCount === 3){
      players[socket.client.id] = 3;
    }
    else if (socket.conn.server.clientsCount === 4){
      players[socket.client.id] = 4;
    }
    return players[socket.client.id];
}
