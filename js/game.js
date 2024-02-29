let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  // console.log("My Character is", world.character);
  // console.log("My Enemy is", world.enemies);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "d") {
    keyboard.RIGHT = true;
  }
  if (e.key === "ArrowLeft" || e.key === "a") {
    keyboard.LEFT = true;
  }
  if (e.key === "ArrowUp" || e.key === "w") {
    keyboard.UP = true;
  }
  if (e.key === "f") {
    keyboard.F = true;
  }
  if (e.key === " " || e.key === " ") {
    keyboard.SPACE = true;
  }
  /* console.log(e); */
  
  
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" || e.key === "d") {
    keyboard.RIGHT = false;
  }
  if (e.key === "ArrowLeft" || e.key === "a") {
    keyboard.LEFT = false;
  }
  if (e.key === "ArrowUp" || e.key === "w") {
    keyboard.UP = false;
  }
  if (e.key === "f") {
    keyboard.F = false;
  }
  if (e.key === " " || e.key === " ") {
    keyboard.SPACE = false;
  }
});

document.addEventListener("mousedown", (e) => {
  if (e.button === 0) { 
    keyboard.LEFT_CLICK = true;
  }
  /* console.log(e); */
});

document.addEventListener("mouseup", (e) => {
  if (e.button === 0) {
    keyboard.LEFT_CLICK = false;
  }
});