function getCoordinates() {
  var longlat = localStorage.getItem('Coordinates');

  document.getElementById('position').value = longlat;
}

window.addEventListener("load", getCoordinates);
