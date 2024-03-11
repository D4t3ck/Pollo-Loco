function playBackgroundMusic() {
  setTimeout(() => {
    let backgroundMusic = world.AUDIO.background_music;
    backgroundMusic.volume = 0.3;
    backgroundMusic.play();
  }, 1000);
}

/**
 * Schaltet den Ton ein oder aus und aktualisiert die Klassen entsprechend.
 * @param {string} id - Die ID des ersten Elements.
 * @param {string} id2 - Die ID des zweiten Elements.
 * @param {string} classList - Die Klassenliste, die getoggelt werden soll.
 * @param {boolean} mute - Gibt an, ob der Ton stummgeschaltet werden soll (true) oder nicht (false).
 */
function toggleSound(id, id2, classList, mute) {
  toggleClassList(id, id2, classList);
  const sounds = [
    "background_music",
    "walking_sound",
    "jumping_sound",
    "snoring_sound",
    "hurt_sound",
    "dead_sound",
    "coin_collect",
    "bottle_collect",
    "bottle_smash",
    "throw_sound",
    "chicken_splat",
    "chicken_dead",
    "game_win",
    "game_over",
    "endboss_fight",
  ];
  sounds.forEach((sound) => {
    world.AUDIO[sound].muted = mute;
  });
}

/**
 * Toggelt die angegebene Klassenliste für zwei Elemente.
 * @param {string} id - Die ID des ersten Elements.
 * @param {string} id2 - Die ID des zweiten Elements.
 * @param {string} classList - Die Klassenliste, die getoggelt werden soll.
 */
function toggleClassList(id, id2, classList) {
  document.getElementById(id).classList.toggle(classList);
  document.getElementById(id2).classList.toggle(classList);
}

/**
 * Schaltet den Ton ein.
 * @param {string} id - Die ID des ersten Elements.
 * @param {string} id2 - Die ID des zweiten Elements.
 * @param {string} classList - Die Klassenliste, die getoggelt werden soll.
 */
function turnSoundOn(id, id2, classList) {
  toggleSound(id, id2, classList, true);
}

/**
 * Schaltet den Ton aus.
 * @param {string} id - Die ID des ersten Elements.
 * @param {string} id2 - Die ID des zweiten Elements.
 * @param {string} classList - Die Klassenliste, die getoggelt werden soll.
 */
function turnSoundOff(id, id2, classList) {
  toggleSound(id, id2, classList, false);
}

/* CONTROLS */
function openControls() {
  document.getElementById("controls").classList.remove("d_none");
  document.getElementById("startScreenContainer").classList.add("d_none");
}

function closeControls() {
  document.getElementById("controls").classList.add("d_none");
  document.getElementById("startScreenContainer").classList.remove("d_none");
}
/* CONTROLS */

function startGame() {
  document.getElementById("canvas").classList.remove("d_none");
  document.getElementById("startScreenContainer").classList.add("d_none");
  document.getElementById("menu").classList.remove("d_none");
  initGame();
}

function restartGame() {
  location.reload();
}

function gameWin() {
  setTimeout(() => {
    clearIntervalIds();
    showWinScreen();
    playWinSound();
    resetMusic();
  }, 2000);
}

function gameOver() {
  setTimeout(() => {
    clearIntervalIds();
    showGameOverScreen();
    playOverSound();
    resetMusic();
  }, 1000);
}

function showWinScreen() {
  document.getElementById("winScreen").classList.remove("d_none");
}

function showGameOverScreen() {
  document.getElementById("").classList.remove("d_none");
}

function playWinSound() {
  world.AUDIO.game_win.play();
}

function playOverSound() {
  world.AUDIO.game_over.play();
}

function resetMusic() {
  world.AUDIO.background_music.currentTime = 0;
  world.AUDIO.endboss_fight.currentTime = 0;
  world.AUDIO.background_music.pause();
  world.AUDIO.endboss_fight.pause();
  world.character.stopSnoring();
}

/* FULLSCREEN */
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

document.addEventListener("fullscreenchange", function () {
  let fullscreenOnImg = document.getElementById("fullscreenOn");
  let fullscreenOffImg = document.getElementById("fullscreenOff");

  if (!document.fullscreenElement) {
    fullscreenOnImg.style.display = "none";
    fullscreenOffImg.style.display = "inline";
  }
});
