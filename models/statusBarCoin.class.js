class StatusBarCoin extends StatusBar {
  IMAGES_STATUSBAR = [
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  /**
   * Constructs a new instance of the status bar.
   * Loads the default image and sets its position.
   * Initializes the status bar with the default percentage value.
   */
  constructor() {
    super().loadImage(this.IMAGES_STATUSBAR[0]);
    this.loadImages(this.IMAGES_STATUSBAR);
    this.x = 20;
    this.y = 50;
    this.setPercentage(0);
  }
}
