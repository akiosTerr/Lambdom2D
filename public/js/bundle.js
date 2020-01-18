(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _game = _interopRequireDefault(require("./game"));

var _draw_buildings = _interopRequireDefault(require("./gen_buildings/draw_buildings"));

var _line_draw = _interopRequireDefault(require("./gen_buildings/line_draw"));

var _rng = require("./static_classes/rng");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GAME_WIDTH = 1600;
var GAME_HEIGHT = 800;
var canvas = document.getElementById('gameScreen');
var ctx = canvas.getContext("2d");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT; //ctx.canvas.width = window.innerWidth;
//ctx.canvas.height = window.innerHeight;

var drawSquare = new _draw_buildings["default"](ctx, GAME_WIDTH, GAME_HEIGHT);
var ld = new _line_draw["default"](ctx, GAME_WIDTH, GAME_HEIGHT);
var game = new _game["default"](GAME_WIDTH, GAME_HEIGHT, ctx);
game.start();

var _vecArr = (0, _rng.genRandVec2Array)(5);

_vecArr.forEach(function (item) {
  console.log(item);
}); //let paths = drawSquare.makePath();
//console.log(`path array:${paths}`);


var lastTime = 0;

var gameLoop = function gameLoop(timestamp) {
  var deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  game.clear('black');
  game.update(deltaTime);
  game.draw();
  drawSquare.draw(); //ld.rainbowRay();

  requestAnimationFrame(gameLoop);
};

gameLoop();

},{"./game":3,"./gen_buildings/draw_buildings":4,"./gen_buildings/line_draw":5,"./static_classes/rng":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fps_counter = fps_counter;

var _ui_draw = require("./ui_draw");

var times = [];
var fps = 0;

function refreshLoop() {
  window.requestAnimationFrame(function () {
    var now = performance.now();

    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }

    times.push(now);
    fps = times.length;
    refreshLoop();
  });
}

refreshLoop();

function fps_counter(ctx) {
  (0, _ui_draw.draw_text)(fps, 'green', ctx);
}

},{"./ui_draw":10}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _player = _interopRequireDefault(require("./player"));

var _input = _interopRequireDefault(require("./input"));

var _fpsCounter = require("./fpsCounter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game(gameWidth, gameHeight, ctx) {
    _classCallCheck(this, Game);

    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.ctx = ctx;
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
    value: function clear(color) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    }
  }, {
    key: "update",
    value: function update(deltatime) {
      this.gameObjects.forEach(function (obj) {
        return obj.update(deltatime);
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this = this;

      this.gameObjects.forEach(function (obj) {
        return obj.draw(_this.ctx);
      });
      (0, _fpsCounter.fps_counter)(this.ctx);
    }
  }, {
    key: "addPlayer",
    value: function addPlayer() {}
  }]);

  return Game;
}();

exports["default"] = Game;

},{"./fpsCounter":2,"./input":6,"./player":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log_vec2 = log_vec2;
exports["default"] = void 0;

var _vector = _interopRequireDefault(require("../static_classes/vector2"));

var _rng = require("../static_classes/rng");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DrawBuildings =
/*#__PURE__*/
function () {
  function DrawBuildings(ctx, width, height) {
    _classCallCheck(this, DrawBuildings);

    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.thickness = 5;
    this.color = 'blue';
    this.lineCountMin = 4;
    this.lineCountMax = 7;
    this.lineLenghtMin = 30;
    this.lineLenghtMax = 80;
    this.start;
    this.path_array;
    this.last_point;
  }

  _createClass(DrawBuildings, [{
    key: "draw",
    value: function draw() {
      this.ctx.lineWidth = this.thickness;
      this.ctx.strokeStyle = (0, _rng.getRandomColor)();
      this.scriblings(); //setTimeout(() => {this.scriblings}, 1000);
    }
  }, {
    key: "draw_path",
    value: function draw_path(v2arr) {
      var start = v2arr[0];
      this.ctx.moveTo(start.x, start.y); // v2arr.array.forEach(v2 => {
      // });
    }
  }, {
    key: "scriblings",
    value: function scriblings() {
      var len = 3;
      var vec2arr = (0, _rng.genRandVec2Array)(len);
      var start = vec2arr[0];
      this.ctx.moveTo(start.x, start.y);

      for (var i = 1; i < vec2arr.length; i++) {
        var obj = vec2arr[i];
        this.ctx.lineTo(obj.x, obj.y);
        this.ctx.stroke();
      }
    }
  }, {
    key: "makePath",
    value: function makePath() {
      var start = get_random_point(this.width, this.height);
      var line_count = (0, _rng.rngRound)(this.lineCountMin, this.lineCountMax);
      var lineLenghts = []; //this.path_array = [];

      log_vec2(start, 'start:');
      this.path_array.push(start.vector2d);
      lineLenghts = (0, _rng.genRngArray)(line_count, this.lineLenghtMin, this.lineLenghtMax);

      for (var i = 0; i < lineLenghts.length; i++) {
        console.log(lineLenghts[i]);
      }

      console.log("Line Count:".concat(line_count));
      console.log("lenghts:".concat(lineLenghts));

      for (var _i = 0; _i < line_count; _i++) {
        var new_point = {};
        log_vec2(new_point, ' new point');

        if (_i == line_count - 1) {
          console.log('last loop');

          if (Math.round(Math.random()) == 1) {
            new_point.x = start.x;
          } else {
            new_point.y = start.y;
          }

          this.path_array.push(new_point);
          continue;
        }

        if (_i % 2) {
          var a = Math.round(Math.random());
          var b = a == 1 ? lineLenghts[_i] : lineLenghts[_i] * -1;
          console.log(b);
          new_point.x += b;
        } else {
          var _a = Math.round(Math.random());

          var _b = _a == 1 ? lineLenghts[_i] : lineLenghts[_i] * -1;

          console.log(_b);
          new_point.y += _b;
        }

        log_vec2(new_point, 'new point end:');
        this.path_array.push(new_point);
        this.last_point = new_point;
      }

      for (var _i2 = 0; _i2 < this.path_array.length; _i2++) {
        var element = this.path_array[_i2];
        console.log(element);
      }

      this.path_array.push(start);
      return this.path_array;
    }
  }]);

  return DrawBuildings;
}();

exports["default"] = DrawBuildings;

function log_vec2(vec, label) {
  console.log("".concat(label, " X:").concat(vec.x, " Y:").concat(vec.y));
}

},{"../static_classes/rng":8,"../static_classes/vector2":9}],5:[function(require,module,exports){
"use strict";

var _rng = require("./../static_classes/rng");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function LineDraw(ctx, gameWidth, gameHeight) {
    _classCallCheck(this, LineDraw);

    this.ctx = ctx;
    this.W = gameWidth;
    this.H = gameHeight;
    this.iterations = 25;
    this.offset = 0;
    this.offsetMin = 5;
    this.offsetMax = 300;
    this.min = gameHeight / 2;
    this.max = gameHeight / 2;
    this.stroke_thickness = 7;
    this.direction = 0;
    this.lineLenght = 80;
    this.oscilation_speed = 17;
  }

  _createClass(LineDraw, [{
    key: "rainbowRay",
    value: function rainbowRay() {
      this.ctx.beginPath();
      var w = 0; //this.ctx.moveTo(100,100);

      while (w < this.W) {
        var min = this.min - this.offset;
        var max = this.max + this.offset;
        var randHeight = (0, _rng.rngRound)(min, max);
        this.ctx.lineWidth = this.stroke_thickness;
        this.ctx.lineTo(w, randHeight);
        this.ctx.stroke();
        this.ctx.strokeStyle = (0, _rng.getRandomColor)(); //h = (h*-1)+300;

        w += this.lineLenght;
      } //console.log(`dir:${this.direction} offset:${this.offset}`);


      if (this.direction == 1) {
        this.offset += this.oscilation_speed;

        if (this.offset > this.offsetMax) {
          this.direction = 0;
        }
      } else {
        this.offset -= this.oscilation_speed;

        if (this.offset < this.offsetMin) {
          this.direction = 1;
        }
      }
    }
  }]);

  return LineDraw;
}();

},{"./../static_classes/rng":8}],6:[function(require,module,exports){
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
  });
  document.addEventListener("keypress", function (event) {
    var key = event.keyCode;

    switch (key) {
      case 97:
        console.log('left');
        player.move({
          x: -1
        });
        break;

      case 100:
        console.log('right');
        player.move({
          x: 1
        });
        break;

      case 119:
        console.log('up');
        player.move({
          y: -1
        });
        break;

      case 115:
        console.log('down');
        player.move({
          y: 1
        });
        break;

      default:
        console.log(key);
        break;
    }
  }, false);
};

exports["default"] = InputHandler;

},{}],7:[function(require,module,exports){
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
    this.velocity = 60;
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
    value: function move(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;

      //console.log('\n'+x);
      //console.log('\n'+y);
      if (x) {
        this.accel.x = x;
      }

      if (y) {
        this.accel.y = y;
      }
    }
  }, {
    key: "update",
    value: function update(deltatime) {
      if (!deltatime) return; //let {ax,ay} = this.accel;

      this.position.x += this.accel.x * this.velocity / deltatime;
      this.position.y += this.accel.y * this.velocity / deltatime;
    }
  }]);

  return Player;
}();

exports["default"] = Player;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rngRound = rngRound;
exports.genRngArray = genRngArray;
exports.genRandVec2Array = genRandVec2Array;
exports.get_random_point = get_random_point;
exports.getRandomColor = getRandomColor;

var _vector = _interopRequireDefault(require("./vector2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var width = 1600;
var height = 800;

function rngRound(min_value, max_value) {
  return Math.round(Math.random() * (max_value - min_value) + min_value);
}

function genRngArray(len, min, max) {
  var _arr = [];

  for (var i = 0; i < len; i++) {
    _arr[i] = rngRound(min, max);
  }

  return _arr;
}

function genRandVec2Array(len) {
  var vec2 = new _vector["default"](0, 0);
  var point;

  for (var i = 0; i < len; i++) {
    point = get_random_point(width, height);
    vec2.push_obj(point.x, point.y);
  }

  return vec2.path_array();
}

function get_random_point(w, h) {
  var width = rngRound(0, w);
  var height = rngRound(0, h);
  var point = new _vector["default"](width, height);
  return point.vector2d;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

},{"./vector2":9}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector2 =
/*#__PURE__*/
function () {
  function Vector2(x, y) {
    _classCallCheck(this, Vector2);

    this.vector2d = {
      x: x,
      y: y
    };
    this.path = [];
  }

  _createClass(Vector2, [{
    key: "push_obj",
    value: function push_obj(x, y) {
      var _obj = {
        x: x,
        y: y
      };
      this.path.push(_obj);
    }
  }, {
    key: "path_array",
    value: function path_array() {
      return this.path;
    }
  }, {
    key: "set_vector",
    value: function set_vector(x, y) {
      this.vector2d.x = x;
      this.vector2d.y = y;
    }
  }, {
    key: "_path",
    set: function set(pathArr) {
      this.path = pathArr;
    }
  }]);

  return Vector2;
}();

exports["default"] = Vector2;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.draw_text = draw_text;

function draw_text(txt, color, ctx) {
  ctx.font = "25px Impact";
  ctx.fillStyle = color;
  ctx.fillText(txt, 20, 40);
}

},{}]},{},[1]);
