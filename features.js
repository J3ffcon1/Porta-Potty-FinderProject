var Features = function (title, hours, position, handWash, privacy, service, clean, rollRating, comment) {
  this.title = title;
  this.hours = hours;
  this.position = position;
  this.type = "potty";
  this.wash = handWash;
  this.privacy = privacy;
  this.service = service;
  this.clean = clean;
  this.overall = rollRating;
  this.comment = comment;
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