// !COPY EMAIL
// add icon on load
document.addEventListener("DOMContentLoaded", addIconCopyEmail);
function addIconCopyEmail() {
  document.getElementById("copy-email").style.display = "flex";
}

// add action on click
document.getElementById("copy-email").addEventListener("click", copyEmail);

// copy email
function copyEmail() {
  navigator.clipboard.writeText(document.getElementById("email").innerHTML);
  this.disabled = true;
  this.innerHTML = "✅";
  setTimeout(() => {
    this.disabled = false;
    this.innerHTML = "✂️";
  }, 2000);
}
