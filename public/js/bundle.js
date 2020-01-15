(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _player = _interopRequireDefault(require("./player"));

var _input = _interopRequireDefault(require("./input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GAME_WIDTH = 800;
var GAME_HEIGHT = 500;
var player = new _player["default"](GAME_WIDTH, GAME_HEIGHT);
var input = new _input["default"](player);
var canvas = document.getElementById('gameScreen');
var ctx = canvas.getContext("2d");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

var clear = function clear() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
};

var lastTime = 0;

var gameLoop = function gameLoop(timestamp) {
  var deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  clear();
  player.update(deltaTime);
  player.draw(ctx);
  requestAnimationFrame(gameLoop);
};

gameLoop();

},{"./input":2,"./player":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputHandler = function InputHandler(player) {
  _classCallCheck(this, InputHandler);

  document.addEventListener("keyup", function (event) {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }

    if (event.keyCode === 65 || event.keyCode === 68) player.accel.x = 0;
    if (event.keyCode === 87 || event.keyCode === 83) player.accel.y = 0;
  });
  document.addEventListener("keydown", function (event) {
    var key = event.keyCode;

    switch (key) {
      case 65:
        console.log('left');
        player.accel.x = -1;
        break;

      case 68:
        console.log('right');
        player.accel.x = 1;
        break;

      case 87:
        console.log('up');
        player.accel.y = -1;
        break;

      case 83:
        console.log('down');
        player.accel.y = 1;
        break;

      default:
        console.log(key);
        break;
    }
  });
};

exports["default"] = InputHandler;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player =
/*#__PURE__*/
function () {
  function Player(gameWidth, gameHeight) {
    _classCallCheck(this, Player);

    this.width = 50;
    this.height = 50;
    this.color = '#033';
    this.velocity = 50;
    this.accel = {
      x: 0,
      y: 0
    };
    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.height
    };
  }

  _createClass(Player, [{
    key: "draw",
    value: function draw(ctx) {
      var _this$position = this.position,
          x = _this$position.x,
          y = _this$position.y;
      var _ref = [this.width, this.height],
          w = _ref[0],
          h = _ref[1];
      ctx.fillStyle = this.color;
      ctx.fillRect(x, y, w, h);
    }
  }, {
    key: "move",
    value: function move(pos) {
      this.accel = pos;
    }
  }, {
    key: "update",
    value: function update(deltatime) {
      if (!deltatime) return;
      this.position.x += this.accel.x * this.velocity / deltatime;
      this.position.y += this.accel.y * this.velocity / deltatime;
    }
  }]);

  return Player;
}();

exports["default"] = Player;

},{}]},{},[1]);
