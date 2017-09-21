function getCoordinates() {
  var longlat = localStorage.getItem('Coordinates');

  var longlatnumber = JSON.parse(longlat);
  console.log(longlatnumber);
  document.getElementById('position1').value = longlatnumber.lat;
  document.getElementById('position2').value = longlatnumber.lng;
}

window.addEventListener("load", getCoordinates);
