(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _game = _interopRequireDefault(require("./game"));

var _draw_buildings = _interopRequireDefault(require("./gen_buildings/draw_buildings"));

var _line_draw = _interopRequireDefault(require("./gen_buildings/line_draw"));

var _rng = require("./static_classes/rng");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GAME_WIDTH = 1600;
var GAME_HEIGHT = 800; //ctx.canvas.width = window.innerWidth;
//ctx.canvas.height = window.innerHeight;

var canvas = document.getElementById('gameScreen');
var ctx = canvas.getContext('2d');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
var btn = document.getElementById('left');
var btn2 = document.getElementById('mid1');
btn.addEventListener('click', pathgen);
btn2.addEventListener('click', vec2array);
var specs = {
  countMin: 4,
  countMax: 8,
  lenghtMin: 3,
  lenghtMax: 7
};

function vec2array() {
  console.log((0, _rng.genRandVec2Array)(10));
}

function pathgen() {
  var path_coordinates = (0, _rng.makeSquarePath)(specs); //drawPath(path_coordinates,ctx);
}

var ld = new _line_draw["default"](ctx, GAME_WIDTH, GAME_HEIGHT);
var game = new _game["default"](GAME_WIDTH, GAME_HEIGHT, ctx);
game.start();
var lastTime = 0;

var gameLoop = function gameLoop(timestamp) {
  var deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  game.clear('black');
  game.update(deltaTime);
  game.draw(); //pathgen();
  //ld.rainbowRay(); 

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

var _draw_buildings = _interopRequireDefault(require("./gen_buildings/draw_buildings"));

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
      this.player = new _player["default"](this); //this.drawBuild = new DrawBuilder(this.ctx,this.gameWidth,this.gameHeight);

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

},{"./fpsCounter":2,"./gen_buildings/draw_buildings":4,"./input":6,"./player":7}],4:[function(require,module,exports){
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

var DrawBuilder =
/*#__PURE__*/
function () {
  function DrawBuilder(ctx, width, height) {
    _classCallCheck(this, DrawBuilder);

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
    this.current_path;
    this.last_point;
  }

  _createClass(DrawBuilder, [{
    key: "draw",
    value: function draw() {}
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "scriblings",
    value: function scriblings() {
      var _arr = (0, _rng.genRandVec2Array)(2);

      this.ctx.lineWidth = this.thickness;
      this.ctx.strokeStyle = 'blue';
      this.ctx.beginPath();
      this.ctx.moveTo(_arr[0].x, _arr[0].y);
      this.ctx.lineTo(_arr[1].x, _arr[1].y);
      this.ctx.stroke();
    }
  }, {
    key: "draw_path",
    value: function draw_path(v2arr) {
      var start = v2arr[0];
      this.ctx.moveTo(start.x, start.y);
      this.ctx.beginPath();

      for (var i = 1; i < v2arr.length; i++) {
        var obj = v2arr[i];
        this.ctx.lineTo(obj.x, obj.y);
        this.ctx.stroke();
      }
    }
  }, {
    key: "makePath",
    value: function makePath() {
      var start = (0, _rng.getRandomPoint)(this.width, this.height);
      var line_count = (0, _rng.rngRound)(this.lineCountMin, this.lineCountMax);
      var lineLenghts = [];
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

  return DrawBuilder;
}();

exports["default"] = DrawBuilder;

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
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.offset = 0;
    this.offsetMin = 1;
    this.offsetMax = 200;
    this.min = gameHeight / 2;
    this.max = gameHeight / 2;
    this.stroke_thickness = 7;
    this.direction = 0;
    this.lineLenght = 60;
    this.oscilation_speed = 5;
  }

  _createClass(LineDraw, [{
    key: "rainbowRay",
    value: function rainbowRay() {
      this.ctx.beginPath();
      var w = 0; //this.ctx.moveTo(100,100);

      while (w < this.gameWidth) {
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
  document.addEventListener("keydown", function (event) {
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
exports.makeSquarePath = makeSquarePath;
exports.getRandomPoint = getRandomPoint;
exports.getRandomColor = getRandomColor;

var _vector = _interopRequireDefault(require("./vector2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var gamewidth = 1600;
var gameheight = 800;

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
  var vec2 = new _vector["default"]();

  for (var i = 0; i < len; i++) {
    vec2.push_obj(getRandomPoint(gamewidth, gameheight));
  }

  return vec2.a_path();
}

function listArray(arr) {
  arr.forEach(function (element) {
    console.log(element);
  });
}

function makeSquarePath(specs) {
  var vec2 = new _vector["default"]();
  var start = getRandomPoint(gamewidth, gameheight);
  var lineCount = rngRound(specs.countMin, specs.countMax);
  var lineLenghts = genRngArray(lineCount, specs.lenghtMin, specs.lenghtMax);
  vec2.push_obj(start);
  listArray(vec2.a_path());
  console.log(lineLenghts);

  for (var i = 0; i < lineCount; i++) {
    if (i % 2) {
      vec2.add_vector(lineLenghts[i], 0);
      continue;
    } else {
      vec2.add_vector(0, lineLenghts[i]);
      continue;
    }
  }

  console.log(vec2.a_path());
  return vec2.a_path();
}

function getRandomPoint(w, h) {
  var x = rngRound(0, w);
  var y = rngRound(0, h);
  var vector2d = {
    x: x,
    y: y
  };
  return vector2d;
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
  function Vector2() {
    _classCallCheck(this, Vector2);

    this.vector2d = {
      x: 0,
      y: 0
    };
    this.path = [];
  }

  _createClass(Vector2, [{
    key: "push_obj",
    value: function push_obj(_obj) {
      this.vector2d = _obj;
      this.path.push(_obj);
    }
  }, {
    key: "add_vector",
    value: function add_vector(x, y) {
      var vec = {
        x: this.vector2d.x,
        y: this.vector2d.y
      };
      vec.x += x;
      vec.y += y;
      this.push_obj(vec);
    }
  }, {
    key: "set_vector",
    value: function set_vector(x, y) {
      this.vector2d.x = x;
      this.vector2d.y = y;
    }
  }, {
    key: "a_path",
    value: function a_path() {
      return this.path;
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
