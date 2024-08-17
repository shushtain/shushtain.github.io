// !COPY EMAIL
document.getElementById("copy-email").addEventListener("click", copyEmail);

function copyEmail() {
  navigator.clipboard.writeText(document.getElementById("email").innerHTML);
  this.innerHTML = `Copied`;
  setTimeout(() => {
    this.innerHTML = `Copy`;
  }, 2000);
}
