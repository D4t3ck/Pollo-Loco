class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  levelEnd = 1280 * 4;

  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
