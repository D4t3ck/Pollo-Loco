/**
 * Redirects the user to "./game.html".
 */
function redirect() {
  window.location.href = "./game.html";
}

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

function closeModal() {
  const modal = document.getElementById("contentModal");
  modal.style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("contentModal");
  if (event.target === modal) {
    closeModal();
  }
};

/**
 * Prevents the event from propagating.
 * @param {Event} event - The event to prevent propagation.
 */
function doNotClose(event) {
  event.stopPropagation();
}

// window.onload = function () {
//   closeModal();
// };
