const assert = require('chai').assert;

const Game = require('../lib/game');

describe('Game', function() {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d');
  context('should take and create attributes', function() {
    let game = new Game(ctx, canvas);

    it('should recieve and assign the ctx', function() {
      assert.equal(game.ctx, ctx);
    });

    it('should recieve and assign the canvas', function() {
      assert.equal(game.canvas, canvas);
    });

    it('should create empty ball array', function() {
      assert.equal(game.balls.length, 0);
    });

    it('should create empty paddle array', function() {
      assert.equal(game.paddles.length, 0);
    });

    it('should create empty player array', function() {
      assert.equal(game.players.length, 0);
    });

    it('should establish block and player sizes', function() {
      assert.equal(game.cornerSize, 5);
      assert.equal(game.playerSize, 2);
      assert.equal(game.blockSize, 43);
    });
  });

  describe('beginRound', function () {
    // jQuery breaking tests
    xit('should create a ball inside the balls array', function () {
      let game = new Game(ctx, canvas);
      assert.equal(game.balls.length, 0);
      game.beginRound();
      assert.equal(game.balls.length, 1);
    });

    xit('should call createGrid function', function () {
      let spy = sinon.spy("createGrid")
      let game = new Game(ctx, canvas);
      game.beginRound();
      assert(spy.calledOnce, 'createGrid method was called on game')
    });

    xit('should begin the animation', function () {

    });
  });
});
