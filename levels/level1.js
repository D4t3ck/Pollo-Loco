const level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken(), new Endboss()],
  [new Cloud(), new Cloud(), new Cloud(), new Cloud()],

  [
    new BackgroundObject("./img/5_background/layers/air.png", -1279),
    new BackgroundObject(
      "./img/5_background/layers/3_third_layer/2.png",
      -1279
    ),
    new BackgroundObject(
      "./img/5_background/layers/2_second_layer/2.png",
      -1279
    ),
    new BackgroundObject(
      "./img/5_background/layers/1_first_layer/2.png",
      -1279
    ),
    new BackgroundObject("./img/5_background/layers/air.png", 0),
    new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("./img/5_background/layers/air.png", 1279),
    new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 1279),
    new BackgroundObject(
      "./img/5_background/layers/2_second_layer/2.png",
      1279
    ),
    new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 1279),

    new BackgroundObject("./img/5_background/layers/air.png", 1279 * 2),
    new BackgroundObject(
      "./img/5_background/layers/3_third_layer/1.png",
      1279 * 2
    ),
    new BackgroundObject(
      "./img/5_background/layers/2_second_layer/1.png",
      1279 * 2
    ),
    new BackgroundObject(
      "./img/5_background/layers/1_first_layer/1.png",
      1279 * 2
    ),
    new BackgroundObject("./img/5_background/layers/air.png", 1279 * 3),
    new BackgroundObject(
      "./img/5_background/layers/3_third_layer/2.png",
      1279 * 3
    ),
    new BackgroundObject(
      "./img/5_background/layers/2_second_layer/2.png",
      1279 * 3
    ),
    new BackgroundObject(
      "./img/5_background/layers/1_first_layer/2.png",
      1279 * 3
    ),
  ],
  [
    new Bottle(200),
    new Bottle(900),
    new Bottle(1250),
    new Bottle(1600),
    new Bottle(2000),
    new Bottle(2500),
    new Bottle(2800),
    new Bottle(3500),
    new Bottle(4000),
    new Bottle(4500),
  ],

  [
    new Coin(200),
    new Coin(450),
    new Coin(550),
    new Coin(700),
    new Coin(750),
    new Coin(750),
    new Coin(830),
    new Coin(950),
    new Coin(1150),
    new Coin(1150),
    new Coin(1250),
    new Coin(1350),
    new Coin(1400),
    new Coin(1400),
    new Coin(1550),
    new Coin(1550),
    new Coin(1650),
    new Coin(1650),
    new Coin(1850),
    new Coin(2000),
  ]
);
