class Cloud extends MovableObject {
  y = 80;
  width = 500;
  height = 300;

  constructor(imagePath, x) {
    super().loadImage(imagePath, x);
    this.x = x;
    this.speed = 0.15 + Math.random() * 0.1;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
