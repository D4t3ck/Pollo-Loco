class DrawableObject {
  height = 150;
  width = 100;
  x = 120;
  y = 300;
  img;
  imageCache = [];
  currentImage = 0;
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  loadImage(path) {
    this.img = new Image(); // == this.img = document.getElementById('image') <img id="image">
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn("Error loading image", e);
      console.log("%c Could not load image", "color:orange", this.img.src);
    }
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof ChickenSmall ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "goldenrod";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.right - this.offset.left,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
  }
}
