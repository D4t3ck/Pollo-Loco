class StatusBarEndboss extends StatusBar {
  IMAGES_STATUSBAR = [
    "./img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  /**
   * Constructs a new instance of the status bar.
   * Loads the default image and sets its position.
   * Initializes the status bar with a full percentage value (100%).
   */
  constructor() {
    super().loadImage(this.IMAGES_STATUSBAR[0]);
    this.loadImages(this.IMAGES_STATUSBAR);
    this.x = 950;
    this.y = 5;
    this.setPercentage(100);
  }
}
