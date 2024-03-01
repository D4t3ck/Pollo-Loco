class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  levelEnd = 1280 * 3;

  constructor(enemies, clouds, backgroundObjects, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
  }
}
