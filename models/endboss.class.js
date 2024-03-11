class Endboss extends MovableObject {
  x = 4500;
  y = 80;
  width = 500;
  height = 600;
  speed = 15;
  speedThroughHit = 50;
  firstContact = false;

  offset = {
    top: 90,
    bottom: 20,
    right: 20,
    left: 20,
  };

  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
		"./img/4_enemie_boss_chicken/1_walk/G2.png",
		"./img/4_enemie_boss_chicken/1_walk/G3.png",
		"./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_HURT = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animateEnbossOnReach();
  }

  animateEnbossOnReach() {
    setStoppableInterval(() => {
      this.endbossReached();
      if (this.hadFirstContact) {
        this.animateEndboss();
      }
    }, 120);
  }

  animateEndboss() {
    if (this.isDead()) {
      this.dead();
    } else if (
      !this.isDead() &&
      !this.isHurt() &&
      !this.endbossInReach() &&
      this.endbossFightBegins()
    ) {
      this.movingLeft();
    } else if (
      !this.isDead() &&
      !this.isHurt() &&
      this.endbossInReach() &&
      this.endbossFightBegins()
    ) {
      this.movingRight();
    } else if (!this.isDead() && this.isHurt()) {
      this.hurt();
    } else {
      this.alert();
    }
  }

  dead() {
    this.playAnimation(this.IMAGES_DEAD);
    gameWin();
  }

  movingLeft() {
    setTimeout(() => {
      super.moveLeft();
      this.playAnimation(this.IMAGES_WALKING);
      this.otherDirection = false;
    }, 500);
  }

  movingRight() {
    setTimeout(() => {
      super.moveRight();
      this.playAnimation(this.IMAGES_WALKING);
      this.otherDirection = true;
    }, 500);
  }

  alert() {
    this.playAnimation(this.IMAGES_ALERT);
  }

  hurt() {
    this.playAnimation(this.IMAGES_HURT);
    this.endbossRushForward();
  }

  endbossInReach() {
    return world.level.endboss[0].x < world.character.x - 100;
  }

  endbossReached() {
    if (world.character.x > 3100) {
      // playEndbossSound();
      this.hadFirstContact = true;
    }
  }

  endbossFightBegins() {
    return world.character.x > world.level.endboss[0].x - 800;
  }

  endbossRushForward() {
    if (!this.otherDirection) {
      world.level.endboss[0].x -= this.speedThroughHit;
    } else {
      world.level.endboss[0].x += this.speedThroughHit;
    }
  }
}
