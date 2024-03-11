class Character extends MovableObject {
  x = 0;
  y = 250;

  height = 400;
  width = 300;
  speed = 10;
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

  animateCharacter() {
    setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
    setStoppableInterval(() => this.initCharacter(), 80);
  }

  moveCharacter() {
    if (!this.isDead()) {
      if (this.canMoveRight()) this.moveRight();
      if (this.canMoveLeft()) this.moveLeft();
      if (this.canJump()) this.jump();
      this.scrollMap();
    }
  }

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

  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    this.stopSnoring();
    world.AUDIO.walking_sound.play();
  }

  canMoveLeft() {
    let canMove = this.world.keyboard.LEFT && this.x > -1000;

    if (canMove) {
      this.isWalking = true;
      return canMove;
    } else if (this.isWalking && !this.world.keyboard.RIGHT) {
      this.stopWalkingSound();
    }
  }

  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
    this.stopSnoring();
    world.AUDIO.walking_sound.play();
  }

  stopWalkingSound() {
    world.AUDIO.walking_sound.pause();
    this.isWalking = false;
  }

  canJump() {
    return (
      (this.world.keyboard.SPACE && !this.isAboveGround()) ||
      (this.world.keyboard.UP && !this.isAboveGround())
    );
  }

  jump() {
    super.jump();
    world.AUDIO.jumping_sound.play();
    this.stopSnoring();
  }

  scrollMap() {
    this.world.camera_x = -this.x + 200;
  }

  deathAnimation() {
    gameOver();
    this.playAnimation(this.IMAGES_DEAD);
    world.AUDIO.dead_sound.play();
    this.stopSnoring();
  }

  hurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    world.AUDIO.hurt_sound.play();
    this.stopSnoring();
  }

  stopSnoring() {
    if (this.isSnoring) {
      world.AUDIO.snoring_sound.pause();
      this.snoring = false;
      this.setTimeStamp();
    }
  }

  jumpAnimation() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.setTimeStamp();
  }

  moveAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    this.setTimeStamp();
  }

  sleepAnimation() {
    this.isSnoring = true;
    this.playAnimation(this.IMAGES_SLEEPING);
    world.AUDIO.snoring_sound.play();
  }

  idleAnimation() {
    this.playAnimation(this.IMAGES_IDLE);
  }

  lastMoveTimepassed() {
    let timepassed = new Date().getTime() - this.characterLastMovement;
    timepassed = timepassed / 500;
    return timepassed;
  }

  setTimeStamp() {
    this.characterLastMovement = new Date().getTime();
  }
}