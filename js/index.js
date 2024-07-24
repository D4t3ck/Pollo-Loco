/**
 * Redirects the user to "./game.html".
 */
function redirect() {
  window.location.href = "./game.html";
}

/**
 * Opens a modal with content based on the specified type.
 * @param {string} type - The type of content to display in the modal.
 */
function openModal(type) {
  const contentDiv = document.getElementById("modalContent");
  const modal = document.getElementById("contentModal");
  if (contentData[type]) {
    contentDiv.innerHTML = contentData[type];
    modal.style.display = "flex";
  } else {
    contentDiv.innerHTML = "<p>Content not found.</p>";
    modal.style.display = "none";
  }
}

/**
 * Closes the currently open modal.
 */
function closeModal() {
  const modal = document.getElementById("contentModal");
  modal.style.display = "none";
}

/**
 * Handles clicks outside the modal to close it.
 * @param {Event} event - The click event object.
 */
window.onclick = function (event) {
  const modal = document.getElementById("contentModal");
  if (event.target === modal) {
    closeModal();
  }
};

/**
 * Prevents the event from propagating further.
 * @param {Event} event - The event to prevent propagation.
 */
function doNotClose(event) {
  event.stopPropagation();
}

/**
 * Changes the text content of a button to "¡Vamos!".
 * @param {HTMLButtonElement} button - The button element to update.
 */
function changeText(button) {
  button.textContent = "¡Vamos!";
}

/**
 * Resets the text content of a button to "¡Start!".
 * @param {HTMLButtonElement} button - The button element to update.
 */
function resetText(button) {
  button.textContent = "¡Start!";
}
