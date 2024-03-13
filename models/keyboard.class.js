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
    this.eventTouchpadBtns();
  }

  /**
   * Sets up event listeners for keyboard controls.
   * Tracks keydown and keyup events to update the keyboard state accordingly.
   */
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
  }

  /**
   * Initializes touch event listeners for controlling game actions on touchpad buttons.
   */
  eventTouchpadBtns() {
    setTimeout(() => {
      document
        .getElementById("movingLeftBtn")
        .addEventListener("touchstart", (event) => {
          event.preventDefault();
          this.LEFT = true;
        });

      document
        .getElementById("movingLeftBtn")
        .addEventListener("touchend", (event) => {
          event.preventDefault();
          this.LEFT = false;
        });

      document
        .getElementById("movingRightBtn")
        .addEventListener("touchstart", (event) => {
          event.preventDefault();
          this.RIGHT = true;
        });

      document
        .getElementById("movingRightBtn")
        .addEventListener("touchend", (event) => {
          event.preventDefault();
          this.RIGHT = false;
        });

      document
        .getElementById("mobileThrow")
        .addEventListener("touchstart", (event) => {
          event.preventDefault();
          this.F = true;
        });

      document
        .getElementById("mobileThrow")
        .addEventListener("touchend", (event) => {
          event.preventDefault();
          this.F = false;
        });

      document
        .getElementById("mobileJump")
        .addEventListener("touchstart", (event) => {
          event.preventDefault();
          this.SPACE = true;
        });

      document
        .getElementById("mobileJump")
        .addEventListener("touchend", (event) => {
          event.preventDefault();
          this.SPACE = false;
        });
    }, 500);
  }
}
