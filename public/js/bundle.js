(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _game = _interopRequireDefault(require("./game"));

var _line_draw = _interopRequireWildcard(require("./gen_buildings/line_draw"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GAME_WIDTH = 1600;
var GAME_HEIGHT = 800;
var canvas = document.getElementById('gameScreen');
var ctx = canvas.getContext("2d");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT; //ctx.canvas.width = window.innerWidth;
//ctx.canvas.height = window.innerHeight;

var ld = new _line_draw["default"](ctx, GAME_WIDTH, GAME_HEIGHT);
var game = new _game["default"](GAME_WIDTH, GAME_HEIGHT);
game.start();
var lastTime = 0;

var gameLoop = function gameLoop(timestamp) {
  var deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  game.clear(ctx, 'black');
  game.update(deltaTime);
  game.draw(ctx);
  ld.rainbowRay();
  requestAnimationFrame(gameLoop);
};

gameLoop();

},{"./game":2,"./gen_buildings/line_draw":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _player = _interopRequireDefault(require("./player"));

var _input = _interopRequireDefault(require("./input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game(gameWidth, gameHeight) {
    _classCallCheck(this, Game);

    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      this.player = new _player["default"](this);
      this.gameObjects = [this.player];
      new _input["default"](this.player);
    }
  }, {
    key: "clear",
    value: function clear(ctx, color) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    }
  }, {
    key: "addPlayer",
    value: function addPlayer() {}
  }, {
    key: "update",
    value: function update(deltatime) {
      this.gameObjects.forEach(function (object) {
        return object.update(deltatime);
      });
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      this.gameObjects.forEach(function (object) {
        return object.draw(ctx);
      });
    }
  }]);

  return Game;
}();

exports["default"] = Game;

},{"./input":4,"./player":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rng = rng;
exports.getRandomColor = getRandomColor;
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//c.fillRect(100,100,100,100);

/*
c.moveTo(0,0);
c.lineTo(500,300);
c.stroke();
*/
var LineDraw =
/*#__PURE__*/
function () {
  function LineDraw(ctx, gameWidth, gameHeight) {
    _classCallCheck(this, LineDraw);

    this.ctx = ctx;
    this.W = gameWidth;
    this.H = gameHeight;
    this.iterations = 40;
    this.min = 50;
    this.max = 100;
    this.stroke_thickness = 10;
  }

  _createClass(LineDraw, [{
    key: "rainbowRay",
    value: function rainbowRay() {
      this.ctx.beginPath();
      var w = 0; //c.moveTo(w,h);

      for (var i = 0; i < this.iterations; i++) {
        if (w > this.gameWidth) {
          console.log("out of bounds in:".concat(i, " iterations"));
          break;
        }

        var randHeight = rng(this.min, this.max);
        this.ctx.lineTo(w, randHeight);
        this.ctx.lineWidth = this.stroke_thickness;
        this.ctx.stroke();
        this.ctx.strokeStyle = getRandomColor(); //h = (h*-1)+300;

        w += 60;
      }

      this.min += 1;
      this.max += 1;
    }
  }]);

  return LineDraw;
}();

exports["default"] = LineDraw;

function rng(min_value, max_value) {
  return Math.random() * (max_value - min_value) + min_value;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
  function Player(game) {
    _classCallCheck(this, Player);

    this.width = 25;
    this.height = 25;
    this.color = 'red';
    this.velocity = 50;
    this.accel = {
      x: 0,
      y: 0
    };
    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight / 2 - this.height / 2
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
