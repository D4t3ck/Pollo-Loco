class Bottle extends DrawableObject {
  width = 120;
  height = 90;
  index = Math.floor(Math.random() * 2);

  offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  };

  IMAGES_BOTTLE = [
    "./img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "./img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates a new Bottle instance.
   * @param {number} x - The x-coordinate of the bottle.
   */
  constructor(x) {
    super().loadImage(this.IMAGES_BOTTLE[this.index]);
    this.x = x + Math.random() * 500;
    this.y = 540;
  }
}
