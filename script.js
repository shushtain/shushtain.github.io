let rnd = Math.floor(Math.random() * (200 - 30) + 30);

window.addEventListener('load', function() {
  document.querySelector(':root').style.setProperty('--color-accent', 'hsl(' + rnd + ',100%,50%)');
});