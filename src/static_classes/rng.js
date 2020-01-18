import Vector2 from './vector2'

var width = 1600;
var height = 800;

export function rngRound(min_value , max_value)
{
    return Math.round(Math.random() * (max_value-min_value) + min_value);
}

export function genRngArray(len,min,max){
  let _arr = [];
  for (let i = 0; i < len; i++) {
    _arr[i] = rngRound(min,max);
  }
  return _arr;
}

export function genRandVec2Array(len){
  let vec2 = new Vector2(0,0);
  let point;
  for (let i = 0; i < len; i++) {
    point = get_random_point(width,height)
    vec2.push_obj(point.x,point.y);
  }
  return vec2.path_array();
}

export function get_random_point (w,h){
  let width = rngRound(0,w);
  let height = rngRound(0,h);
  let point = new Vector2(width,height);
  return point.vector2d;
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

