class ChickenSmall extends MovableObject {
  y = 550;
  height = 70;
  width = 70;
  moveChickenInterval;
  animateChickenInterval;

  offset = {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  };

  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGE_DEAD = ["./img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor(x) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = x + Math.random() * 500;
    this.speed = 0.4 + Math.random() * 0.5;
    this.animateSmallChicken();
  }

  animateSmallChicken() {
		this.moveChickenInterval = setInterval(() => {
			// this.moveLeft();
		}, 1000 / 30);

		this.animateChickenInterval = setInterval(() => {
			this.playAnimation(this.IMAGES_WALKING);
		}, 100);

		intervalIds.push(this.moveChickenInterval);
		intervalIds.push(this.animateChickenInterval);
	}
}
