class Keyboard {
  UP = false;
  RIGHT = false;
  LEFT = false;
  SPACE = false;
  F = false;
  P = false;
  LEFT_CLICK = false;

  constructor() {
    this.keyboardControls();
  }

  keyboardControls() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "d") {
        keyboard.RIGHT = true;
      }
      if (e.key === "ArrowLeft" || e.key === "a") {
        keyboard.LEFT = true;
      }
      if (e.key === "ArrowUp" || e.key === "w") {
        keyboard.UP = true;
      }
      if (e.key === "f") {
        keyboard.F = true;
      }
      if (e.key === "p") {
        keyboard.P = true;
      }
      if (e.key === " " || e.key === " ") {
        keyboard.SPACE = true;
      }
      /* console.log(e); */
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowRight" || e.key === "d") {
        keyboard.RIGHT = false;
      }
      if (e.key === "ArrowLeft" || e.key === "a") {
        keyboard.LEFT = false;
      }
      if (e.key === "ArrowUp" || e.key === "w") {
        keyboard.UP = false;
      }
      if (e.key === "f") {
        keyboard.F = false;
      }
      if (e.key === "p") {
        keyboard.P = false;
      }
      if (e.key === " " || e.key === " ") {
        keyboard.SPACE = false;
      }
    });

    window.addEventListener("mousedown", (e) => {
      if (e.button === 0) {
        keyboard.LEFT_CLICK = true;
      }
    });

    window.addEventListener("mouseup", (e) => {
      if (e.button === 0) {
        keyboard.LEFT_CLICK = false;
      }
    });
  }
}
