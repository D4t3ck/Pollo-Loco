let canvas;
let world;
let keyboard = new Keyboard();
i = 1;
intervalIds = [];

function init() {
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  // console.log("My Character is", world.character);
  // console.log("My Enemy is", world.enemies);
}

function setStoppableInterval(fn, time) {
  let idInterval = setInterval(fn, time);
  this.intervalIds.push(idInterval);
}

function clearIntervalIds() {
  intervalIds.forEach(clearInterval);
  intervalIds = [];
}
