class Chicken extends MovableObject {
  y = 540;

  height = 100;
  width = 100;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);

    this.x = 900 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.5;

    this.animateChicken();
  }

  animateChicken() {
    setInterval(() => {
      // this.moveLeft();
    }, 1000 / 60);
 
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
