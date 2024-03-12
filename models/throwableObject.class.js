class ThrowableObject extends MovableObject {
  offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  };

  IMAGES_BOTTLE_ROTATION = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Constructs a new instance of a salsa bottle.
   * @param {number} x - The x-coordinate of the salsa bottle's position.
   * @param {number} y - The y-coordinate of the salsa bottle's position.
   * @param {boolean} otherDirection - Determines the direction in which the bottle is thrown.
   */
  constructor(x, y, otherDirection) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.width = 120;
    this.height = 90;
    this.otherDirection = otherDirection;
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.throwBottle();
  }

  /**
   * Initiates the bottle throwing sequence by applying gravity and starting animation.
   */
  throwBottle() {
    this.bottleGravity();
    this.bottleAnimation();
  }

  /**
   * Applies gravity to the bottle and moves it horizontally based on the throw direction.
   */
  bottleGravity() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      if (this.otherDirection) {
        this.x -= 10;
      } else {
        this.otherDirection;
        this.x += 10;
      }
    }, 25);
    world.character.stopSnoring();
  }

  /**
   * Controls the animation of the bottle during the throw sequence.
   */
  bottleAnimation() {
    setStoppableInterval(() => {
      if (!this.isAboveGround()) {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
      } else {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
      }
    }, 1000 / 10);
  }
}
