class MovableObject extends DrawableObject {
  speed = 0.15;
  speedY = 0;
  otherDirection = false;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) { // throwable objects should always fall
      return true;
    } else {
      return this.y < 250;
    }
  }

  // character.isColliding(chicken);
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
			this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
			this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
			this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // difference in ms
    timePassed = timePassed / 1000; // difference in sec
    return timePassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  chickenKilled() {
		return (this.energy == 0);
	}

  playAnimation(images) {
    let i = this.currentImage % images.length; // let i = 0 % 6; // 0, Rest 0
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}

// if (
//   character.x + characcter.width > chicken.x &&
//   character.y + character.height > chicken.y &&
//   character.x < chicken.x &&
//   characcter.y < chicken.y + moveBy.height
// );