class ThrowableObject extends MovableObject {

    offset = {
		top: 10,
		bottom: 10,
		left: 10,
		right: 10,
	};

    constructor(x, y, otherDirection) {
        super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 80;
        this.otherDirection = otherDirection;
        this.throw(100, 150);
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (this.otherDirection) {
           this.x -= 10;
        } else {
            this.otherDirection;
            this.x += 10;
        }
        }, 25);
    }
}