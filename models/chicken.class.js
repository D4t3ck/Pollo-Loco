class Chicken extends MovableObject {
  y = 530;
  height = 100;
  width = 100;
  moveChickenInterval;
  animateChickenInterval;

  offset = {
    top: 5,
    bottom: 5,
    right: 5,
    left: 5,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD = ["./img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Creates a new instance of a Chicken object.
   * @param {number} x - The initial x-coordinate of the chicken.
   */
  constructor(x) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = x + Math.random() * 500;
    this.speed = 0.4 + Math.random() * 2;
    this.animateChicken();
  }

  /**
   * Initiates the animation for the chicken object.
   */
  animateChicken() {
    this.moveChickenInterval = setInterval(() => {
      if (world.character.x < this.x) {
        this.moveLeft();
        this.otherDirection = false;
      } else {
        this.moveRight();
        this.otherDirection = true;
      }
    }, 1000 / 30);

    this.animateChickenInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);

    intervalIds.push(this.moveChickenInterval);
    intervalIds.push(this.animateChickenInterval);
  }
}
