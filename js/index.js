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

function openImpress() {
  impressContainer.style.display = "flex";
}

function closeImpress() {
  impressContainer.style.display = "none";
}

function openPrivacyPolicy() {
  privacyPolicyContainer.style.display = "flex";
}

function closePrivacyPolicy() {
  privacyPolicyContainer.style.display = "none";
}

function doNotClose(event) {
  event.stopPropagation();
}