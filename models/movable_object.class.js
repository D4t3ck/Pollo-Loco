class MovableObject {
  // Schablone wie ein JSON; sie sagt welche Felder dort drinn sein sollen
  x = 120;
  y = 300;
  img;
  height = 150;
  width = 100;

  loadImage(path) {
    this.img = new Image(); // == this.img = document.getElementById('image') <img id="image">
    this.img.src = path;
  }

  moveRight() {
    console.log("moving right");
  }

  moveLeft() {}
}
