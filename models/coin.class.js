class Coin extends MovableObject {
  with = 200;
  height = 200;

  offset = {
    top: 70,
    bottom: 70,
    left: 30,
    right: 30,
  };

  IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(x) {
    super().loadImage(this.IMAGES_COIN[0]);
    this.loadImages(this.IMAGES_COIN);
    this.x = x + Math.random() * 2000;
    this.y = 200 + Math.random() * 100;
    this.animateCoins();
  }

  animateCoins() {
    setInterval(() => {
        this.playAnimation(this.IMAGES_COIN);
    }, 350);
}
}
