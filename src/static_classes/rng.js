import Vector2 from './vector2'

var gamewidth = 1600;
var gameheight = 800;

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
  let vec2 = new Vector2();
  for (let i = 0; i < len; i++) {
    vec2.push_obj(getRandomPoint(gamewidth,gameheight));
  }
  return vec2.a_path();
}

export function getRandomPoint (w,h){
  let x = rngRound(0,w);
  let y = rngRound(0,h);
  let vector2d = {
    x:x,
    y:y,
  };
  return vector2d;
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function listArray(arr){
  arr.forEach(element => {
    console.log(element);
  });
}


export function makeSquarePath(specs){
  let vec2 = new Vector2();
  let start = getRandomPoint(gamewidth,gameheight);
  let lineCount = rngRound(specs.countMin,specs.countMax);
  let lineLenghts = genRngArray(lineCount,specs.lenghtMin,specs.lenghtMax);
  vec2.push_obj(start);
  //listArray(vec2.a_path());
  //console.log(lineLenghts);
  for (let i = 0; i < lineCount; i++) {
    let a = Math.round(Math.random());
    if(i%2) {
      let b = (a==1) ? lineLenghts[i] : (lineLenghts[i]* -1);
      vec2.add_vector(b,0);
      continue;
    }else {
      let b = (a==1) ? lineLenghts[i] : (lineLenghts[i]* -1);
      vec2.add_vector(0,b);
      continue;
    }
  }
  //console.log(vec2.a_path());
  return vec2.a_path();
}



