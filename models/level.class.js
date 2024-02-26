class Level {
  enemies;
  clouds;
  backgroundObjects;
  levelEnd = 1280 * 3;

  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
