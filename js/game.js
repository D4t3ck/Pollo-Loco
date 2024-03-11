let canvas;
let world;
let keyboard = new Keyboard();
i = 1;
intervalIds = [];

function initGame() {
  initLevel();
  playBackgroundMusic();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

}

function setStoppableInterval(fn, time) {
  let idInterval = setInterval(fn, time);
  this.intervalIds.push(idInterval);
}

function clearIntervalIds() {
  intervalIds.forEach(clearInterval);
  intervalIds = [];
}

