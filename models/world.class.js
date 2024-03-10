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

  AUDIO = {
    index_background: new Audio("./audio/indexBackground.mp3"),
    background_music: new Audio("./audio/backgroundMusic.mp3"),
    walking_sound: new Audio("./audio/walking.mp3"),
    jumping_sound: new Audio("./audio/jump.mp3"),
    snoring_sound: new Audio("./audio/snoring.mp3"),
    hurt_sound: new Audio("./audio/hurt.mp3"),
    dead_sound: new Audio("./audio/dead.mp3"),
    coin_collect: new Audio("./audio/coinCollected.mp3"),
    bottle_collect: new Audio("./audio/bottleCollected.mp3"),
    bottle_smash: new Audio("./audio/bottleSmash.mp3"),
    throw_sound: new Audio("./audio/bottleThrow.mp3"),
    chicken_splat: new Audio("./audio/chickenSplat.mp3"),
    chicken_dead: new Audio("./audio/chickenDead.mp3"),
    endboss_fight: new Audio("./audio/endboss_fight.mp3"),
    game_over: new Audio("./audio/game_over.mp3"),
    game_win: new Audio("./audio/win.mp3"),
  };

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.throwInterval();
    this.checkCollisionsWithThrowingBottle();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setStoppableInterval(() => {
      this.checkCollisionsEnemy();
      this.checkCollisonsBottles();
      this.checkCollisionCoins();
      this.checkCollisionsEndboss();
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

  killChicken(enemy, performJump = true) {
    this.AUDIO.chicken_splat.currentTime = 0;
    enemy.isDead();
    if (performJump) {
      this.character.jump();
    }
    this.AUDIO.chicken_splat.play();
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
        this.AUDIO.bottle_collect.currentTime = 0;
        this.AUDIO.bottle_collect.play();
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
        this.AUDIO.coin_collect.currentTime = 0;
        this.coinCollected(coin);
        this.character.raiseProgressbarCoin();
        this.statusBarCoin.setPercentage(this.character.progessCoinBar);
        this.AUDIO.coin_collect.play();
      }
    });
  }

  coinCollected(coin) {
    let i = this.level.coins.indexOf(coin);
    this.level.coins.splice(i, 1);
  }

  //////////////////////////////////

 checkCollisionsEndboss() {
  this.level.endboss.forEach((endboss) => {
    if (
      this.character.isColliding(endboss) &&
      !this.character.isHurt() &&
      !endboss.isDead()
    ) {
      this.character.hit();
      this.statusBarLife.setPercentage(this.character.energy);
    }
  });
}


  //////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////

  throwInterval() {
    setStoppableInterval(() => {
      this.checkThrowObjects();
    }, 200);
  }

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
      this.AUDIO.throw_sound.play();
    }
  }

  checkCollisionsWithThrowingBottle() {
    setStoppableInterval(() => {
      this.killChickenWithBottle();
      this.hurtEndboss();
    }, 200);
  }

  hurtEndboss() {
    this.throwableObject.forEach((bottle) => {
      this.level.endboss.forEach((endboss) => {
        if (bottle.isColliding(endboss)) {
          endboss.hit(endboss.energy);
          this.statusBarEndboss.setPercentage(endboss.energy);
          this.AUDIO.chicken_splat.currentTime = 0;
          this.AUDIO.bottle_smash.currentTime = 0;
          this.AUDIO.bottle_smash.play();
          this.AUDIO.chicken_splat.play();
          this.AUDIO.chicken_dead.play();
          setTimeout(() => {
            this.eraseThrowingBottleFromArray(bottle);
          }, 180);
        }
      });
    });
  }

  killChickenWithBottle() {
    this.throwableObject.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          this.killChicken(enemy, false);
          setTimeout(() => {
            this.eraseThrowingBottleFromArray(bottle);
          }, 180);
        }
      });
    });
  }

  canBottleBeThrown() {
    return this.keyboard.F && this.collectedBottles > 0;
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
    // mo.drawFrame(this.ctx); // frame for collision debugging

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
