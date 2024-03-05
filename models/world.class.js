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
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    /* this.checkCollisions(); */
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setStopableInterval(() => {
      this.checkCollisionsEnemy();
      // this.checkCollisionCoins();
      // this.checkCollisonsBottles();
      // this.checkCollisionsEndboss();
    }, 1000 / 30);
  }

  //////////////////

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkCollisions() {
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

  checkThrowObjects() {
    if (keyboard.LEFT_CLICK || keyboard.F) {
      let bottle = new ThrowableObject(
        this.character.x + 120,
        this.character.y + 120,
        this.character.otherDirection
      );
      this.throwableObjects.push(bottle);
    }
  }

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
    enemy.chickenKilled();
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
    this.addObjectsToMap(this.throwableObjects);
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

/////////////////////
