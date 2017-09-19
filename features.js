var Features = function (title, hours, position, handWash, privacy, service, clean, rollRating, comment) {
  this.title = title;
  this.hours = hours;
  this.position = position;
  this.distance = 0;
  this.type = "potty";
  this.wash = handWash;
  this.privacy = privacy;
  this.service = service;
  this.clean = clean;
  this.overall = rollRating;
  this.comment = comment;
}
// adding variables to use with google maps.
var map;
var marker;
var infowindow;
var messagewindow;

function addMapEventListeners() {
  console.log("adding eventlistener to map");

  google.maps.event.addListener(map, "click", function(event) {
    console.log("attempting to add marker after click");
    marker = new google.maps.Marker({
      position: event.latLng,
      map: map
    });
  });

}

function saveData() {
  var name = document.getElementById('name').value;
  var address = document.getElementById('address').value;
  var type = document.getElementById('type').value;
  var latlng = marker.getPosition();

  downloadUrl(url, function(data, responseCode) {

    if (responseCode == 200 && data.length <= 1) {
      infowindow.close();
      messagewindow.open(map, marker);
    }
  });
}

var pottySpots = [];
pottySpots.push (new Features ('Riverfront Potty', 'Always Open', {lat: 45.52549, lng: -122.670283} , 'yes', '2', '1', '3', '2', '' ));
pottySpots.push (new Features ('Super Stinky Potty', 'Always Open', {lat: 45.52441, lng: -122.677257} , 'no', '1', '1', '1', '2', '' ));
pottySpots.push (new Features ('Park Ave Potty', '9am to Dusk', {lat: 45.52448, lng: -122.67914} , 'yes', '4', '2', '3', '2', '' ));
pottySpots.push (new Features ('Freeway Potty', '11am to 7pm', {lat: 45.523540534, lng: -122.68671992} , 'no', '5', '3', '2', '4', '' ));
pottySpots.push (new Features ('Sizzle Potty', 'Dusk to Dawn', {lat: 45.522292, lng: -122.682042} , 'yes', '3', '5', '2', '1', '' ));

function showMarkers() {
  for (var i=0; i < pottySpots.length; i++) {
    var marker = new google.maps.Marker({
      position: pottySpots[i].position,
      map: map
    });
  }
}

function proximity(lat1, lng1, lat2, lng2, unit){
  var radlat1 = Math.PI * lat1/180
  var radlat2 = Math.PI * lat2/180
  var theta = lng1 - lng2
  var radtheta = Math.PI * theta/180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  return dist
}

function calculateDistance() {
  for (var i=0; i < pottySpots.length; i++){
    var distance = proximity(pos.lat, pos.lng, pottySpots[i].position.lat, pottySpots[i].position.lng);
    pottySpots[i].distance = distance;
  }
}

function sortDistance(left, right) {
  if (left.distance < right.distance) {return -1}
  else if (left.distance > right.distance) {return 1}
  else {return 0}
}
function sortPottyList() {
  sortedPotties = pottySpots.sort(sortDistance);
}

window.addEventListener("load", showMarkers)
window.addEventListener("load", addMapEventListeners)
