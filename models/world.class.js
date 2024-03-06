class World {
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  character = new Character();
  statusBarLife = new StatusBarLife();
  statusBarBottle = new StatusBarBottle();
  statusBarCoin = new StatusBarCoin();
  statusBarEndboss = new StatusBarEndboss();
  throwableObject = [];
  collectedBottles = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.throwInterval();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setStoppableInterval(() => {
      this.checkCollisionsEnemy();
      this.checkCollisonsBottles();
      this.checkCollisionCoins();
      // this.checkCollisionsEndboss();
    }, 1000 / 30);
  }

  //////////////////////////////////////////////////////////////

  checkCollisionsEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isHurt()) {
        if (this.character.isAboveGround()) {
          this.killChicken(enemy);
        } else {
          this.character.hit();
          this.statusBarLife.setPercentage(this.character.energy);
        }
      }
    });
  }

  killChicken(enemy) {
    //this.chickenDeadSound.currentTime = 0;
    enemy.isDead();
    this.character.jump();
    //this.chickenDeadSound.play();
    clearInterval(enemy.animateChickenInterval);
    clearInterval(enemy.moveChickenInterval);
    enemy.loadImage(enemy.IMAGE_DEAD);
    setTimeout(() => {
      this.eraseEnemyFromArray(enemy);
    }, 550);
  }

  eraseEnemyFromArray(enemy) {
    let i = this.level.enemies.indexOf(enemy);
    this.level.enemies.splice(i, 1);
  }

  //////////////////////////////////

  

  //////////////////////////////////

  checkCollisonsBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.bottleCollected(bottle);
        this.character.raiseProgressbarBottle();
        this.statusBarBottle.setPercentage(this.character.progressBottleBar);
        // this.AUDIO.bottle_collect_sound.currentTime = 0;
        // this.AUDIO.bottle_collect_sound.play();
      }
    });
  }

  bottleCollected(bottle) {
    let i = this.level.bottles.indexOf(bottle);
    this.level.bottles.splice(i, 1);
    this.collectedBottles++;
  }

  //////////////////////////////////

  checkCollisionCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        // this.AUDIO.coin_collect_sound.currentTime = 0;
        this.coinCollected(coin);
        this.character.raiseProgressbarCoin();
        this.statusBarCoin.setPercentage(this.character.progessCoinBar);
        // this.AUDIO.coin_collect_sound.play();
      }
    });
  }

  coinCollected(coin) {
    let i = this.level.coins.indexOf(coin);
    this.level.coins.splice(i, 1);
  }

  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////

  throwInterval() {
    setStoppableInterval(() => {
      this.checkThrowObjects();
    }, 200);
  }

  // checkCollisionsWithThrowingBottle() {
  //   setStoppableInterval(() => {
  //     this.checkCollisionBottleWithEndboss();
  //   }, 200);
  // }

  checkThrowObjects() {
    if (this.canBottleBeThrown()) {
      let bottle = new ThrowableObject(
        this.character.x + 120,
        this.character.y + 120,
        this.character.otherDirection
      );
      this.throwableObject.push(bottle);
      this.collectedBottles--;
      this.character.reduceProgressbarBottle();
      this.statusBarBottle.setPercentage(this.character.progressBottleBar);
      // this.AUDIO.throw_sound.play();
    }
  }

  canBottleBeThrown() {
    return (
      (this.keyboard.LEFT_CLICK && this.collectedBottles > 0) ||
      (this.keyboard.F && this.collectedBottles > 0)
    );
  }

  eraseThrowingBottleFromArray(bottle) {
    let i = this.throwableObject.indexOf(bottle);
    this.throwableObject.splice(i, 1);
  }

  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addBackgroundGraphics();
    this.addMovableObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.addStatusBars();

    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addBackgroundGraphics() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
  }

  addMovableObjects() {
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObject);
    this.addToMap(this.character);
  }

  addStatusBars() {
    this.addToMap(this.statusBarLife);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarEndboss);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx); // frame for collision debugging

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}

//////////////////////////////////////////////////////////////
