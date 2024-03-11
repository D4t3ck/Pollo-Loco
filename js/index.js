function initBackground() {}

function redirect() {
  window.location.href = "./game.html";
}

function openStory() {
  storyContainer.style.display = "flex";
}

function closeStory() {
  storyContainer.style.display = "none";
}

function doNotClose(event) {
  event.stopPropagation();
}