function playBackgroundMusic() {
  setTimeout(() => {
    let backgroundMusic = world.AUDIO.background_music;
    backgroundMusic.volume = 0.6;
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
/* FULLSCREEN */

// function fullscreen() {
//   let fullscreen = document.getElementById("canvas");
//   enterFullscreen(fullscreen);
// }

// function enterFullscreen(element) {
//   if (element.requestFullscreen) {
//     element.requestFullscreen();
//   } else if (element.msRequestFullscreen) {
//     element.msRequestFullscreen();
//   } else if (element.webkitRequestFullscreen) {
//     element.webkitRequestFullscreen();
//   }
// }
