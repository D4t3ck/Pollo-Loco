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
    game_win: new Audio("./audio/game_win.mp3"),
  };

  /**
   * Constructs a new instance of the game engine.
   * @param {HTMLCanvasElement} canvas - The canvas element on which the game is rendered.
   * @param {Keyboard} keyboard - The keyboard controller used for player input.
   */
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

  /**
   * Sets up the game world by assigning the world reference to the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Periodically checks for collisions between game objects.
   */
  checkCollisions() {
    setStoppableInterval(() => {
      this.checkCollisionsEnemy();
      this.checkCollisonsBottles();
      this.checkCollisionCoins();
      this.checkCollisionsEndboss();
    }, 1000 / 30);
  }

  /**
   * Checks collisions between the character and enemies.
   * If a collision occurs and the character is not hurt, either the enemy is killed or the character is hurt depending on the character's position.
   */
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

  /**
   * Kills a chicken enemy.
   * @param {Enemy} enemy - The chicken enemy to be killed.
   * @param {boolean} [performJump=true] - Whether to make the character jump after killing the chicken (optional, defaults to true).
   */
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
      this.eraseEnemyFromArray(enemy); //// setTimeout rausnehmen
    }, 550);
  }

  /**
   * Removes an enemy from the enemies array.
   * @param {Enemy} enemy - The enemy object to be removed.
   */
  eraseEnemyFromArray(enemy) {
    let i = this.level.enemies.indexOf(enemy);
    this.level.enemies.splice(i, 1);
  }

  /**
   * Checks collisions between the character and bottles.
   * If a collision occurs, the bottle is collected, and the character's progress bar for bottles is raised.
   */
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

  /**
   * Handles the collection of a bottle by removing it from the bottles array and updating collected bottle count.
   * @param {Bottle} bottle - The bottle object that has been collected.
   */
  bottleCollected(bottle) {
    let i = this.level.bottles.indexOf(bottle);
    this.level.bottles.splice(i, 1);
    this.collectedBottles++;
  }

  /**
   * Checks collisions between the character and coins.
   * If a collision occurs, the coin is collected, and the character's progress bar for coins is raised.
   */
  checkCollisionCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.AUDIO.coin_collect.currentTime = 0;
        this.coinCollected(coin);
        this.character.raiseProgressbarCoin();
        this.statusBarCoin.setPercentage(this.character.progessCoinBar);
        this.AUDIO.coin_collect.play();
        this.AUDIO.coin_collect.volume = 0.4;
      }
    });
  }

  /**
   * Handles the collection of a coin by removing it from the coins array.
   * @param {Coin} coin - The coin object that has been collected.
   */
  coinCollected(coin) {
    let i = this.level.coins.indexOf(coin);
    this.level.coins.splice(i, 1);
  }

  /**
   * Checks collisions between the character and the end boss.
   * If a collision occurs and the character is not hurt and the end boss is not dead, the character is hurt.
   */
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

  /**
   * Initiates an interval for checking if throwable objects can be thrown.
   */
  throwInterval() {
    setStoppableInterval(() => {
      this.checkThrowObjects();
    }, 200);
  }

  /**
   * Checks if throwable objects can be thrown and creates a new throwable object if conditions are met.
   */
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

  /**
   * Initiates an interval for checking collisions between throwing objects and the end boss.
   */
  checkCollisionsWithThrowingBottle() {
    setStoppableInterval(() => {
      this.hurtEndboss();
    }, 200);
  }

  /**
   * Checks for collisions between throwing objects and the end boss, causing damage to the end boss if a collision occurs.
   */
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

  /**
   * Checks if the character can throw a bottle.
   * @returns {boolean} True if the character can throw a bottle, otherwise false.
   */
  canBottleBeThrown() {
    return this.keyboard.F && this.collectedBottles > 0;
  }

  /**
   * Removes a throwing bottle from the throwing object array.
   * @param {ThrowableObject} bottle - The throwing bottle object to be removed.
   */
  eraseThrowingBottleFromArray(bottle) {
    let i = this.throwableObject.indexOf(bottle);
    this.throwableObject.splice(i, 1);
  }

  /**
   * Draws the game scene on the canvas.
   */
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

  /**
   * Adds background graphics to the game scene.
   */
  addBackgroundGraphics() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
  }

  /**
   * Adds movable objects (such as bottles, coins, enemies, etc.) to the game scene.
   */
  addMovableObjects() {
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObject);
    this.addToMap(this.character);
  }

  /**
   * Adds status bars (such as life, bottle, coin, end boss) to the game scene.
   */
  addStatusBars() {
    this.addToMap(this.statusBarLife);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarEndboss);
  }

  /**
   * Adds an array of objects to the game scene.
   * @param {GameObject[]} objects - An array of GameObjects to be added to the scene.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a movable object to the game scene, taking into account its direction.
   * @param {GameObject} mo - The movable object to be added to the scene.
   */
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

  /**
   * Flips the image horizontally for the given movable object.
   * @param {GameObject} mo - The movable object whose image is to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Reverts the image back to its original orientation after flipping.
   * @param {GameObject} mo - The movable object whose image is to be reverted.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
