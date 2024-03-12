class Cloud extends MovableObject {
  y = 80;
  width = 500;
  height = 300;

  /**
   * Creates a new instance of a Cloud object.
   * @param {string} imagePath - The image path of the cloud.
   * @param {number} x - The initial x-coordinate of the cloud.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath, x);
    this.x = x;
    this.speed = 0.15 + Math.random() * 0.1;
    this.animate();
  }

  /**
   * Initiates the animation for the cloud object.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
