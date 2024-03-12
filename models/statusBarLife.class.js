class StatusBarLife extends StatusBar {
  x = 20;
  y = 0;

  IMAGES_STATUSBAR = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  /**
   * Constructs a new instance of the status bar.
   * Loads the default image and initializes the status bar with a full percentage value (100%).
   */
  constructor() {
    super().loadImage(this.IMAGES_STATUSBAR[0]);
    this.loadImages(this.IMAGES_STATUSBAR);
    this.setPercentage(100);
  }
}
