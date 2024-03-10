function initBackground() {
    playIndexBackgroundMusic();
  }
  
  function playIndexBackgroundMusic() {
      setTimeout(() => {
        let indexBackground = new Audio("./audio/indexBackground.mp3");
        indexBackground.play();
      }, 1000);
  }
  
  function redirect() {
    window.location.href = "./game.html";
  }
