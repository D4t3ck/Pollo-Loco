class Endboss extends MovableObject {
  x = 4500;
  y = 80;
  width = 500;
  height = 600;
  speed = 15;
  speedThroughHit = 100;
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

  /**
   * Constructs an instance of the character.
   * Loads initial images for walking, alert, hurt, and dead states.
   * Initiates the animation for the endboss when reached.
   * @constructor
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animateEnbossOnReach();
  }

  /**
   * Initiates the animation for the endboss when reached.
   * The animation includes checking for first contact and then animating the endboss accordingly.
   */
  animateEnbossOnReach() {
    setStoppableInterval(() => {
      this.endbossReached();
      if (this.hadFirstContact) {
        this.animateEndboss();
      }
    }, 120);
  }

  /**
   * Animates the endboss based on its current state.
   * If the character is dead, it performs the dead animation.
   * If the character is hurt, it performs the hurt animation.
   * If the character is not hurt and the endboss fight begins,
   * it checks if the endboss is in reach and sets the character's movement accordingly.
   * Otherwise, it sets the character in an alert state.
   */
  animateEndboss() {
    if (this.isDead()) {
      this.dead();
    } else if (!this.isHurt() && this.endbossFightBegins()) {
      if (!this.endbossInReach()) {
        this.movingLeft();
      } else {
        this.movingRight();
      }
    } else if (this.isHurt()) {
      this.hurt();
    } else {
      this.alert();
    }
  }

  /**
   * Plays the dead animation and triggers the game win.
   */
  dead() {
    this.playAnimation(this.IMAGES_DEAD);
    gameWin();
  }

  /**
   * Moves the character left after a delay, triggering the walking animation.
   */
  movingLeft() {
    setTimeout(() => {
      super.moveLeft();
      this.playAnimation(this.IMAGES_WALKING);
      this.otherDirection = false;
    }, 500);
  }

  /**
   * Moves the character right after a delay, triggering the walking animation.
   */
  movingRight() {
    setTimeout(() => {
      super.moveRight();
      this.playAnimation(this.IMAGES_WALKING);
      this.otherDirection = true;
    }, 500);
  }

  /**
   * Triggers the alert animation.
   */
  alert() {
    this.playAnimation(this.IMAGES_ALERT);
  }

  /**
   * Plays the hurt animation and makes the end boss rush forward.
   */
  hurt() {
    this.playAnimation(this.IMAGES_HURT);
    this.endbossRushForward();
  }

  /**
   * Checks if the end boss is in reach of the character.
   * @returns {boolean} True if the end boss is in reach, otherwise false.
   */
  endbossInReach() {
    return world.level.endboss[0].x < world.character.x - 100;
  }

  /**
   * Checks if the character has reached the end boss's position.
   */
  endbossReached() {
    if (world.character.x > 3400) {
      world.AUDIO.endboss_fight.play();
      world.AUDIO.background_music.volume = 0.1;
      this.hadFirstContact = true;
    }
  }

  /**
   * Checks if the end boss fight is about to begin.
   * @returns {boolean} True if the end boss fight is about to begin, otherwise false.
   */
  endbossFightBegins() {
    return world.character.x > world.level.endboss[0].x - 800;
  }

  /**
   * Makes the end boss rush forward towards the character's direction.
   */
  endbossRushForward() {
    if (!this.otherDirection) {
      world.level.endboss[0].x -= this.speedThroughHit;
    } else {
      world.level.endboss[0].x += this.speedThroughHit;
    }
  }
}
