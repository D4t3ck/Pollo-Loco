/**
 * Plays the background music after a delay of 1000 milliseconds.
 */
function playBackgroundMusic() {
  setTimeout(() => {
    let backgroundMusic = world.AUDIO.background_music;
    backgroundMusic.volume = 0.3;
    backgroundMusic.play();
  }, 1000);
}

/**
 * Toggles the sound on or off and updates corresponding classes.
 * @param {string} id - The ID of the first element.
 * @param {string} id2 - The ID of the second element.
 * @param {string} classList - The class list to be toggled.
 * @param {boolean} mute - Indicates whether to mute the sound (true) or not (false).
 */
function toggleSound(id, id2, classList, mute) {
  toggleClassList(id, id2, classList);
  const sounds = [
    // List of sound IDs
  ];
  sounds.forEach((sound) => {
    world.AUDIO[sound].muted = mute;
  });
}

/**
 * Toggles the specified class list for two elements.
 * @param {string} id - The ID of the first element.
 * @param {string} id2 - The ID of the second element.
 * @param {string} classList - The class list to be toggled.
 */
function toggleClassList(id, id2, classList) {
  document.getElementById(id).classList.toggle(classList);
  document.getElementById(id2).classList.toggle(classList);
}

/**
 * Turns the sound on.
 * @param {string} id - The ID of the first element.
 * @param {string} id2 - The ID of the second element.
 * @param {string} classList - The class list to be toggled.
 */
function turnSoundOn(id, id2, classList) {
  toggleSound(id, id2, classList, true);
}

/**
 * Turns the sound off.
 * @param {string} id - The ID of the first element.
 * @param {string} id2 - The ID of the second element.
 * @param {string} classList - The class list to be toggled.
 */
function turnSoundOff(id, id2, classList) {
  toggleSound(id, id2, classList, false);
}

/**
 * Opens the controls screen.
 */
function openControls() {
  document.getElementById("controls").classList.remove("d_none");
  document.getElementById("startScreenContainer").classList.add("d_none");
}

/**
 * Closes the controls screen.
 */
function closeControls() {
  document.getElementById("controls").classList.add("d_none");
  document.getElementById("startScreenContainer").classList.remove("d_none");
}

/**
 * Starts the game.
 */
function startGame() {
  document.getElementById("canvas").classList.remove("d_none");
  document.getElementById("startScreenContainer").classList.add("d_none");
  document.getElementById("menu").classList.remove("d_none");
  initGame();
}

/**
 * Restarts the game by reloading the page.
 */
function restartGame() {
  location.reload();
}

/**
 * Displays the win screen after a delay of 2000 milliseconds.
 */
function gameWin() {
  setTimeout(() => {
    clearIntervalIds();
    showWinScreen();
    playWinSound();
    resetMusic();
  }, 2000);
}

/**
 * Displays the game over screen after a delay of 1000 milliseconds.
 */
function gameOver() {
  setTimeout(() => {
    clearIntervalIds();
    showGameOverScreen();
    playOverSound();
    resetMusic();
  }, 1000);
}

/**
 * Shows the win screen.
 */
function showWinScreen() {
  document.getElementById("winScreen").classList.remove("d_none");
}

/**
 * Shows the game over screen.
 */
function showGameOverScreen() {
  document.getElementById("gameOverScreen").classList.remove("d_none");
}

/**
 * Plays the win sound.
 */
function playWinSound() {
  world.AUDIO.game_win.play();
}

/**
 * Plays the game over sound.
 */
function playOverSound() {
  world.AUDIO.game_over.play();
}

/**
 * Resets the background music and character sounds.
 */
function resetMusic() {
  world.AUDIO.background_music.currentTime = 0;
  world.AUDIO.endboss_fight.currentTime = 0;
  world.AUDIO.background_music.pause();
  world.AUDIO.endboss_fight.pause();
  world.character.stopSnoring();
}

/**
 * Toggles fullscreen mode.
 */
function toggleFullscreen() {
  let fullscreenOnImg = document.getElementById("fullscreenOn");
  let fullscreenOffImg = document.getElementById("fullscreenOff");
  let canvas = document.getElementById("canvas");

  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
    fullscreenOnImg.style.display = "inline";
    fullscreenOffImg.style.display = "none";
  } else {
    document.exitFullscreen();
    fullscreenOnImg.style.display = "none";
    fullscreenOffImg.style.display = "inline";
  }
}

/**
 * Handles the event when fullscreen mode changes.
 */
document.addEventListener("fullscreenchange", function () {
  let fullscreenOnImg = document.getElementById("fullscreenOn");
  let fullscreenOffImg = document.getElementById("fullscreenOff");

  if (!document.fullscreenElement) {
    fullscreenOnImg.style.display = "none";
    fullscreenOffImg.style.display = "inline";
  }
});
