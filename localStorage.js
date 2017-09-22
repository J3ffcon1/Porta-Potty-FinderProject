var Features = function (title, hours, position, handWash, privacy, clean, rollRating, comment) {
  this.title = title;
  this.hours = hours;
  this.position = position;
  this.distance = 0;
  this.type = "potty";
  this.wash = handWash;
  this.privacy = privacy;
  this.clean = clean;
  this.overall = rollRating;
  this.comment = comment;
}

function getCoordinates() {
  var longlat = localStorage.getItem('Coordinates');

  var longlatnumber = JSON.parse(longlat);
  console.log(longlatnumber);
  document.getElementById('position1').value = longlatnumber.lat;
  document.getElementById('position2').value = longlatnumber.lng;
}

function handleSubmit(event) {
  event.preventDefault();
  console.log(event.target.wash.value);

  var newFeature = new Features (
    event.target.reviewtitle.value,
    event.target.hours.value,
    {lat: parseFloat(event.target.lat.value),
    lng: parseFloat(event.target.long.value)} ,
    event.target.wash.value,
    event.target.privacy.value,
     event.target.clean.value,
     event.target.rollRating.value,
     event.target.comment.value);

console.log(newFeature);

var portapotties = localStorage.getItem('pottySpots');
var portapottiesarray = [];
if (portapotties) {
  portapottiesarray = JSON.parse(portapotties);
  }
portapottiesarray.push(newFeature);
portapottiesarray = JSON.stringify(portapottiesarray);
localStorage.setItem('pottySpots', portapottiesarray);
location.href = "index.html";

}


document.getElementById('reviewform').addEventListener('submit', handleSubmit);

window.addEventListener("load", getCoordinates);
