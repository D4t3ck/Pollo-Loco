let canvas;
let world;
let keyboard = new Keyboard();
i = 1;
intervalIds = [];

/**
 * Initializes the game.
 */
function initGame() {
  initLevel();
  playBackgroundMusic();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

/**
* Sets a stoppable interval function.
* @param {Function} fn - The function to be executed in the interval.
* @param {number} time - The time in milliseconds between each execution of the function.
*/
function setStoppableInterval(fn, time) {
  let idInterval = setInterval(fn, time);
  this.intervalIds.push(idInterval);
}

/**
* Clears all interval IDs and stops corresponding intervals.
*/
function clearIntervalIds() {
  intervalIds.forEach(clearInterval);
  intervalIds = [];
}