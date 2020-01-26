# game-of-life.js

## game-of-life intends to be a custom 2d canvas game engine
 
this library  will serve as a canvas boilerplate for developers
it should have most of the common tools for building a **2d canvas web app**

the process of building the custom game engine (or canvas boilerplate)
will include several mini-games to test the engine capabilities 

including a personal project, a 2d proceduraly generated multiplayer game
that uses socket.io

the game should show most of the engine capabilities,
although the boilerplate will shine the most in its back-end
that intends to decrease the code madness which is building a canvas game from zero
by including common classes with usefull functions (like Vector2)

be aware that i will try to use a functional javascript aproach everywhere i can
so it will be a very modular project.

the engine will have several scripts with only exported functions for a specific purpose

Like rng.js which has several functions for random number generation

```javascript
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
```

notice that some functions are dependent on classes like Vector2
and they are all reliant on one another. 
The project will have lots like these, 
including functions and classes for **procedural generation**
which will be one of the focusing points.




