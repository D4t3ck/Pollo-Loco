class Level {
  enemies;
  endboss;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  levelEnd = 1280 * 4;

  /**
   * Constructs a new instance of the game world.
   * @param {Array} enemies - Array containing enemy objects.
   * @param {Array} endboss - Array containing end boss objects.
   * @param {Array} clouds - Array containing cloud objects.
   * @param {Array} backgroundObjects - Array containing background object instances.
   * @param {Array} bottles - Array containing bottle objects.
   * @param {Array} coins - Array containing coin objects.
   */
  constructor(enemies, endboss, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
