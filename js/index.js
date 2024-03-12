/**
 * Redirects the user to "./game.html".
 */
function redirect() {
  window.location.href = "./game.html";
}

/**
* Opens the story container to display the story.
*/
function openStory() {
  storyContainer.style.display = "flex";
}

/**
* Closes the story container to hide the story.
*/
function closeStory() {
  storyContainer.style.display = "none";
}

/**
* Opens the impress container to display the impressum.
*/
function openImpress() {
  impressContainer.style.display = "flex";
}

/**
* Closes the impress container to hide the impressum.
*/
function closeImpress() {
  impressContainer.style.display = "none";
}

/**
* Opens the privacy policy container to display the privacy policy.
*/
function openPrivacyPolicy() {
  privacyPolicyContainer.style.display = "flex";
}

/**
* Closes the privacy policy container to hide the privacy policy.
*/
function closePrivacyPolicy() {
  privacyPolicyContainer.style.display = "none";
}

/**
* Prevents the event from propagating.
* @param {Event} event - The event to prevent propagation.
*/
function doNotClose(event) {
  event.stopPropagation();
}