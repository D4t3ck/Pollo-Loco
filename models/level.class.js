class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  levelEnd = 1280 * 3.5;

  constructor(enemies, clouds, backgroundObjects, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
  }
}
