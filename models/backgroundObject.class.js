class BackgroundObject extends MovableObject {
  width = 1280;
  height = 720;

  /**
   * Creates a new BackgroundObject instance.
   * @param {string} imagePath - The path to the image of the background object.
   * @param {number} x - The x-coordinate of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 720 - this.height;
  }
}
