class Level {
  enemies;
  endboss;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  levelEnd = 1280 * 4;

  constructor(enemies, endboss, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
