var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = {};
var playerNumbers = [1, 2, 3, 4];
var paddles = {
          '1': {player: 1, x: 10, y: (800 / 3), vertical: false},
          '2': {player: 2, x: 730, y: (800 / 3), vertical: false},
          '3': {player: 3, x: 10, y: (800 / 3)*2, vertical: false},
          '4': {player: 4, x: 730, y: (800 / 3)*2, vertical: false}
};

const PORT = process.env.PORT || 3000;

io.on('connection', function(socket){
  console.log('SOMEONE IS TRYING TO CONNECT!!!!!!', socket.client.id);
 if (playerNumbers !== []){
    playerInfo(socket);
  }
  socket.on('initialize', function() {
    socket.emit('initialize', players[socket.client.id]);
  });
  socket.on('paddle', function(paddle){
    if (playerNumbers === []) {
      io.emit('ready', paddles);
    }
    paddles[paddle.player] = paddleLocation(paddle);
    // console.log(players);
    io.emit('paddles', (paddles));
  });
  socket.on('disconnect', function() {
    delete players[socket.client.id];
    playerNumbers.push(players[socket.client.id]);
    // playerCount--;
  });
});

io.listen(PORT);

function paddleLocation(paddleInfo) {
  var paddleString = {
    player: paddleInfo.player,
    x: paddleInfo.x,
    y: paddleInfo.y,
    vertical: paddleInfo.vertical
  };
  return paddleString;
}

function playerInfo(socket){
  players[socket.client.id] = playerNumbers.pop();
  console.log(players[socket.client.id]);
  console.log(playerNumbers);

  return players[socket.client.id];
}
