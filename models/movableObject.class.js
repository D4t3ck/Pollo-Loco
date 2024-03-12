class MovableObject extends DrawableObject {
  speed = 0.15;
  speedY = 0;
  otherDirection = false;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  ground = 260;
  progressBottleBar = 0;
  progessCoinBar = 0;

  /**
   * Applies gravity to the object, causing it to fall if it's above the ground or moving downwards.
   * Gravity is applied at regular intervals.
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above the ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y <= this.ground;
    }
  }

  /**
   * Checks if the object is colliding with another game object.
   * @param {GameObject} mo - The other game object to check collision with.
   * @returns {boolean} True if the objects are colliding, otherwise false.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Decreases the object's energy when hit.
   * If energy drops below 0, it's clamped to 0.
   */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is currently in a hurt state.
   * @returns {boolean} True if the object is in a hurt state, otherwise false.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Checks if the object is dead (has no energy left).
   * @returns {boolean} True if the object is dead, otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Increases the progress bar associated with bottles.
   */
  raiseProgressbarBottle() {
    this.progressBottleBar += 10;
  }

  /**
   * Decreases the progress bar associated with bottles.
   */
  reduceProgressbarBottle() {
    this.progressBottleBar -= 10;
  }

  /**
   * Increases the progress bar associated with coins.
   */
  raiseProgressbarCoin() {
    this.progessCoinBar += 5;
  }

  /**
   * Plays the animation using the provided array of image paths.
   * @param {string[]} images - An array of image paths representing the animation frames.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right based on its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left based on its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Initiates a jump by setting the vertical speed of the object.
   */
  jump() {
    this.speedY = 30;
  }
}
