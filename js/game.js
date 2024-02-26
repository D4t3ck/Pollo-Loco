let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My Character is", world.character);
  console.log("My Enemy is", world.enemies);
}

document.addEventListener("keydown", (e) => {
  if (e.key === 'ArrowRight' || e.key === 'd') {
    keyboard.RIGHT = true;
  }
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    keyboard.LEFT = true;
  }
  if (e.key === 'ArrowUp') {
    keyboard.UP = true;
  }
  if (e.key === 'ArrowDown') {
    keyboard.DOWN = true;
  }
  if (e.key === ' ') {
    keyboard.SPACE = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === 'ArrowRight' || e.key === 'd') {
    keyboard.RIGHT = false;
  }
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    keyboard.LEFT = false;
  }
  if (e.key === 'ArrowUp') {
    keyboard.UP = false;
  }
  if (e.key === 'ArrowDown') {
    keyboard.DOWN = false;
  }
  if (e.key === ' ') {
    keyboard.SPACE = false;
  }
});

