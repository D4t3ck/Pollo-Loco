class Character extends MovableObject {
  x = 0;
  y = 250;

  height = 400;
  width = 300;
  speed = 8.5;
  characterLastMovement = 0;
  isWalking = false;
  isSnoring = false;
  gameWon = false;
  gameLost = false;
  soundPlayed = false;

  offset = {
    top: 150,
    bottom: 20,
    right: 60,
    left: 60,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-51.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
    "img/2_character_pepe/4_hurt/H-43.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-41.png",
  ];

  IMAGES_IDLE = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_SLEEPING = [
    "./img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;

  /**
   * Initializes the character with animations and gravity.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEPING);
    this.applyGravity();
    this.animateCharacter();
  }

  /**
   * Animates the character's movements and actions.
   */
  animateCharacter() {
    setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
    setStoppableInterval(() => this.initCharacter(), 80);
  }

  /**
   * Moves the character based on keyboard input and game conditions.
   */
  moveCharacter() {
    if (!this.isDead()) {
      if (this.canMoveRight()) this.moveRight();
      if (this.canMoveLeft()) this.moveLeft();
      if (this.canJump()) this.jump();
      this.scrollMap();
    }
  }

  /**
   * Initializes the character's animations and actions based on game conditions.
   */
  initCharacter() {
    if (this.isDead()) {
      this.deathAnimation();
    } else if (this.isHurt()) {
      this.hurtAnimation();
    } else if (this.isAboveGround()) {
      this.jumpAnimation();
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.moveAnimation();
    } else if (this.lastMoveTimepassed() > 4) {
      this.sleepAnimation();
    } else {
      this.idleAnimation();
    }
  }

  /**
   * Checks if the character can move right based on keyboard input and game conditions.
   * @returns {boolean} Indicates if the character can move right.
   */
  canMoveRight() {
    let canMove =
      this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd;

    if (canMove) {
      this.isWalking = true;
      return canMove;
    } else if (this.isWalking && !this.world.keyboard.LEFT) {
      this.stopWalkingSound();
    }
  }

  /**
   * Moves the character to the right.
   */
  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    this.stopSnoring();
    world.AUDIO.walking_sound.play();
    world.AUDIO.walking_sound.volume = 0.5;
  }

  /**
   * Checks if the character can move left based on keyboard input and game conditions.
   * @returns {boolean} Indicates if the character can move left.
   */
  canMoveLeft() {
    let canMove = this.world.keyboard.LEFT && this.x > -1000;

    if (canMove) {
      this.isWalking = true;
      return canMove;
    } else if (this.isWalking && !this.world.keyboard.RIGHT) {
      this.stopWalkingSound();
    }
  }

  /**
   * Moves the character to the left.
   */
  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
    this.stopSnoring();
    world.AUDIO.walking_sound.play();
    world.AUDIO.walking_sound.volume = 0.5;
  }

  /**
   * Stops the walking sound when the character stops moving.
   */
  stopWalkingSound() {
    world.AUDIO.walking_sound.pause();
    this.isWalking = false;
  }

  /**
   * Checks if the character can jump based on keyboard input and game conditions.
   * @returns {boolean} Indicates if the character can jump.
   */
  canJump() {
    return (
      (this.world.keyboard.SPACE && !this.isAboveGround()) ||
      (this.world.keyboard.UP && !this.isAboveGround())
    );
  }

  /**
   * Makes the character jump.
   */
  jump() {
    super.jump();
    world.AUDIO.jumping_sound.play();
    this.stopSnoring();
  }

  /**
   * Scrolls the game map based on the character's position.
   */
  scrollMap() {
    this.world.camera_x = -this.x + 200;
  }

  /**
   * Initiates the death animation for the character.
   */
  deathAnimation() {
    gameOver();
    this.playAnimation(this.IMAGES_DEAD);
    world.AUDIO.dead_sound.play();
    this.stopWalkingSound();
    this.stopSnoring();
  }

  /**
   * Initiates the hurt animation for the character.
   */
  hurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    world.AUDIO.hurt_sound.play();
    this.stopSnoring();
  }

  /**
   * Stops the snoring sound if the character is snoring.
   */
  stopSnoring() {
    if (this.isSnoring) {
      world.AUDIO.snoring_sound.pause();
      this.snoring = false;
      this.setTimeStamp();
    }
  }

  /**
   * Initiates the jump animation for the character.
   */
  jumpAnimation() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.setTimeStamp();
  }

  /**
   * Initiates the move animation for the character.
   */
  moveAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    this.setTimeStamp();
  }

  /**
   * Initiates the sleep animation for the character.
   */
  sleepAnimation() {
    this.isSnoring = true;
    this.playAnimation(this.IMAGES_SLEEPING);
    world.AUDIO.snoring_sound.play();
    world.AUDIO.snoring_sound.volume = 0.5;
  }

  /**
   * Initiates the idle animation for the character.
   */
  idleAnimation() {
    this.playAnimation(this.IMAGES_IDLE);
  }

  /**
   * Calculates the time passed since the last character movement.
   * @returns {number} Time passed since the last movement.
   */
  lastMoveTimepassed() {
    let timepassed = new Date().getTime() - this.characterLastMovement;
    timepassed = timepassed / 500;
    return timepassed;
  }

  /**
   * Sets the timestamp for the last character movement.
   */
  setTimeStamp() {
    this.characterLastMovement = new Date().getTime();
  }
}
