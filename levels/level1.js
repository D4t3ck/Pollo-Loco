let level1;

function initLevel() {
  level1 = new Level(
    [
      new Chicken(400),
      new Chicken(800),
      new Chicken(1000),
      new Chicken(1300),
      new Chicken(1700),
      new Chicken(1900),
      new Chicken(2400),
      new Chicken(2700),
      new Chicken(3200),
      new Chicken(3500),
      new ChickenSmall(600),
      new ChickenSmall(900),
      new ChickenSmall(1400),
      new ChickenSmall(1700),
      new ChickenSmall(1900),
      new ChickenSmall(2300),
      new ChickenSmall(2700),
      new ChickenSmall(3100),
      new ChickenSmall(3400),
      new ChickenSmall(3600),
    ],

    [new Endboss()],

    [
      new Cloud("./img/5_background/layers/4_clouds/1.png", 100),
      new Cloud("./img/5_background/layers/4_clouds/2.png", 600),
      new Cloud("./img/5_background/layers/4_clouds/2.png", 1100),
      new Cloud("./img/5_background/layers/4_clouds/2.png", 1600),
      new Cloud("./img/5_background/layers/4_clouds/2.png", 2100),
      new Cloud("./img/5_background/layers/4_clouds/2.png", 2600),
      new Cloud("./img/5_background/layers/4_clouds/2.png", 3100),
      new Cloud("./img/5_background/layers/4_clouds/2.png", 3600),
      new Cloud("./img/5_background/layers/4_clouds/2.png", 4100),
      new Cloud("./img/5_background/layers/4_clouds/2.png", 4600),
      new Cloud("./img/5_background/layers/4_clouds/2.png", 5100),
      new Cloud("./img/5_background/layers/4_clouds/2.png", 5600),
    ],

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
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/2.png",
        1279
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/2.png",
        1279
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/2.png",
        1279
      ),

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

      new BackgroundObject("./img/5_background/layers/air.png", 1279 * 4),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/2.png",
        1279 * 4
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/2.png",
        1279 * 4
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/2.png",
        1279 * 4
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
}
