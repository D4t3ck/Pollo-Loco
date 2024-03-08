function redirect() {
  window.location.href = "./game.html";
}

function playBackgroundMusic() {
	setTimeout(() => {
		world.AUDIO.background_music.play();
	}, 1000);
}

function turnSoundOn(id, id2, classList) {
	toggleClassList(id, id2, classList);
	world.AUDIO.background_music.muted = true;
	world.AUDIO.walking_sound.muted = true;
	world.AUDIO.jumping_sound.muted = true;
	world.AUDIO.snoring_sound.muted = true;
	world.AUDIO.hurt_sound.muted = true;
	world.AUDIO.dead_sound.muted = true;
	world.AUDIO.coin_collect.muted = true;
	world.AUDIO.bottle_collect.muted = true;
	world.AUDIO.bottle_smash.muted = true;
	world.AUDIO.throw_sound.muted = true;
  world.AUDIO.chicken_splat.muted = true;
	world.AUDIO.chicken_dead.muted = true;
	world.AUDIO.game_win.muted = true;
	world.AUDIO.game_over.muted = true;
	world.AUDIO.endboss_fight.muted = true;
}

function turnSoundOff(id, id2, classList) {
	toggleClassList(id, id2, classList);
  world.AUDIO.background_music.muted = false;
	world.AUDIO.walking_sound.muted = false;
	world.AUDIO.jumping_sound.muted = false;
	world.AUDIO.snoring_sound.muted = false;
	world.AUDIO.hurt_sound.muted = false;
	world.AUDIO.dead_sound.muted = false;
	world.AUDIO.coin_collect.muted = false;
	world.AUDIO.bottle_collect.muted = false;
	world.AUDIO.bottle_smash.muted = false;
	world.AUDIO.throw_sound.muted = false;
  world.AUDIO.chicken_splat.muted = false;
	world.AUDIO.chicken_dead.muted = false;
	world.AUDIO.game_win.muted = false;
	world.AUDIO.game_over.muted = false;
	world.AUDIO.endboss_fight.muted = false;
}

function toggleClassList(id, id2, classList) {
	document.getElementById(id).classList.toggle(classList);
	document.getElementById(id2).classList.toggle(classList);
}


function fullscreen() {
    let fullscreen = document.getElementById('canvas');
    enterFullscreen(fullscreen)
}

function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) { 
      element.webkitRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
  