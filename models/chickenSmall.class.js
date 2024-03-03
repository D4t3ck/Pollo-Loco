class ChickenSmall extends MovableObject {
    y = 580;
    height = 70;
    width = 70;

    offset = {
        top: 5,
		bottom: 5,
		right: 5,
		left: 5,
    }

    IMAGES_WALKING = [
        "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
		"./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
		"./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    constructor(x) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
    
        this.x = x + Math.random() * 500;
            this.speed = 0.4 + Math.random() * 0.5;
    
        this.animateChicken();
      }
    
      animateChicken() {
        setInterval(() => {
          /* this.moveLeft(); */
        }, 1000 / 60);
    
        setInterval(() => {
          this.playAnimation(this.IMAGES_WALKING);
        }, 200);
      }
}