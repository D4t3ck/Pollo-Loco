class StatusBarBottle extends StatusBar {
  IMAGES_STATUSBAR = [
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * Constructs a new instance of the status bar.
   * Initializes the status bar with the default image and sets its position.
   */
  constructor() {
    super().loadImage(this.IMAGES_STATUSBAR[0]);
    this.loadImages(this.IMAGES_STATUSBAR);
    this.x = 20;
    this.y = 100;
    this.setPercentage(0);
  }
}
