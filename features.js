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

    localStorage.setItem('Coordinates', JSON.stringify(event.latLng));

    google.maps.event.addListener(marker, 'click', function(event) {
      window.location = "reviews.html";
    });

  });


  // function updateMarkerStatus(str) {
  //   document.getElementById('marker').innerHTML = str;
  // }
  //
  // function updateMarkerPosition(latLng) {
  //   document.getElementById('position').innerHTML = [
  //     latLng.lat(),
  //     latLng.lng()
  //   ].join(', ');
  // }

}

function saveData() {
  var latlng = marker.getPosition();

  downloadUrl(url, function(data, responseCode) {

    if (responseCode == 200 && data.length <= 1) {
      infowindow.close();
      messagewindow.open(map, marker);
    }
  });
}

var pottySpots = [];
pottySpots.push (new Features ('Riverfront Potty', 'Always Open', {lat: 45.52549, lng: -122.670283} , 'Yes', 'private', 'Yes', '2', '' ));
pottySpots.push (new Features ('Super Stinky Potty', 'Always Open', {lat: 45.52441, lng: -122.677257} , 'No', 'public', 'No', '2', '' ));
pottySpots.push (new Features ('Park Ave Potty', '9am to Dusk', {lat: 45.52448, lng: -122.67914} , 'Yes', 'public', 'No', '4', ''));
pottySpots.push (new Features ('Freeway Potty', '11am to 7pm', {lat: 45.523540534, lng: -122.68671992} , 'No', 'private', 'Yes', '4', ''));
pottySpots.push (new Features ('Sizzle Potty', 'Dusk to Dawn', {lat: 45.522292, lng: -122.682042} , 'Yes', 'public', 'No', '3', ''));

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

function displayList() {
  var ulElement = document.createElement("ul");
  var spanTitle = document.createElement("span");
  spanTitle.innerText = "Top 5 Seats Near You";
  spanTitle.setAttribute("id", "spanTitle");
  ulElement.appendChild(spanTitle);
  document.getElementById("displayList").appendChild(ulElement);
  var sortedList = pottySpots.sort(sortDistance);
  for (var i=0; i < sortedList.length; i++) {
    var liElement = document.createElement("li");
    var currentPotty = sortedList[i];
    liElement.innerText = currentPotty.title + " | Roll Rating: " + currentPotty.overall;
    liElement.dataset.title = currentPotty.title;
    liElement.setAttribute("class", "pottyList");
    ulElement.appendChild(liElement);
    liElement.addEventListener("click", displayTable);
  }
}
function buildTable(clicked) {
  var createTable = document.createElement("table");
  var tableBody = document.createElement("tbody");
  tableBody.setAttribute("id", "tBody");
  var row = document.createElement("tr");
  var titleElement = document.createElement("td");
  var overallElement = document.createElement("td");
  overallElement.innerText = "Overall rating: " + clicked.overall + " out of 5.";
  titleElement.innerText = clicked.title;
  titleElement.setAttribute("id", "tableTitle");
  row.appendChild(titleElement);
  row.appendChild(overallElement);
  tableBody.appendChild(row);
  createTable.appendChild(tableBody);
  var row2 = document.createElement("tr");
  var hoursElement = document.createElement("td");
  var washElement = document.createElement("td");
  hoursElement.innerText = "Hours: " + clicked.hours;
  washElement.innerText = "Handwash available: " + clicked.wash;
  row2.appendChild(hoursElement);
  row2.appendChild(washElement);
  tableBody.appendChild(row2);
  var row3 = document.createElement("tr");
  var cleanElement = document.createElement("td");
  var privacyElement = document.createElement("td");
  cleanElement.innerText = "Is it clean? " + clicked.clean;
  privacyElement.innerText = "Private or Public? " + clicked.privacy;
  row3.appendChild(cleanElement);
  row3.appendChild(privacyElement);
  tableBody.appendChild(row3);
  document.getElementById("displayTable").appendChild(createTable);
}

function displayTable(event) {
  document.getElementById("displayTable").innerHTML = "";
  var listClickedTitle = event.target.dataset.title;
  var index = 0;
  do {
    var clicked = sortedPotties[index];
    if (listClickedTitle == clicked.title){
      console.log("Title Clicked" + clicked.title);
      buildTable(clicked);
    } else {
      index++
    }
  }
  while (listClickedTitle !== clicked.title);
}
  function generateList() {
    calculateDistance();
    sortPottyList();
    displayList();
  }
  window.addEventListener("load", showMarkers)
  window.addEventListener("load", addMapEventListeners)
