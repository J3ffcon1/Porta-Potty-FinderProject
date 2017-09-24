// global variables (Google Maps API)
var map;
var marker;
var infowindow;
var messagewindow;
var image;

// object constructor for all potty info
var Features = function (title, hours, position, handWash, privacy, clean, rollRating, comment) {
  this.title = title;
  this.hours = hours;
  this.position = position;
  this.distance = 0; //calculated in calculateDistance() and added to array pottySpots
  this.type = "potty"; //used in showMarkers()
  this.wash = handWash;
  this.privacy = privacy;
  this.clean = clean;
  this.overall = rollRating;
  this.comment = comment;
}

//use constructor Features to add to pottSpots array
var pottySpots = [];
pottySpots.push (new Features ('Riverfront Potty', 'Always Open', {lat: 45.52549, lng: -122.670283} , 'Yes', 'private', 'Yes', '2', 'It was nice. There were no bugs in the potty. I had a grand time.' ));
pottySpots.push (new Features ('Super Stinky Potty', 'Always Open', {lat: 45.52441, lng: -122.677257} , 'No', 'public', 'No', '2', 'Name says it all. Nothing more to be said.' ));
pottySpots.push (new Features ('Park Ave Potty', '9am to Dusk', {lat: 45.52448, lng: -122.67914} , 'Yes', 'public', 'No', '4', 'The location is top notch! I was able to make my stop in peace. Definitely recommend this to anyone!'));
pottySpots.push (new Features ('Freeway Potty', '11am to 7pm', {lat: 45.523540534, lng: -122.68671992} , 'No', 'private', 'Yes', '4', 'Private stops are the BEST! This was the quietest location I have been to so far!'));
pottySpots.push (new Features ('Sizzle Potty', 'Dusk to Dawn', {lat: 45.522292, lng: -122.682042} , 'Yes', 'public', 'No', '3', 'Being right next to a pizza restaurant makes this stop VERY convenient! If you gotta go after you eat its right there! How lucky!'));

//add event listener onClick functionality to: add marker, get coordinates and save to localStorage, get array pottySpots and save to localStorage, open review form
function addMapEventListeners() {
  console.log("adding eventlistener to map");
//add marker
  google.maps.event.addListener(map, "click", function(event) {
    console.log("attempting to add marker after click");
    marker = new google.maps.Marker({
      position: event.latLng,
      icon: image,
      map: map
    });
//save coordinates to localStorage
    localStorage.setItem('Coordinates', JSON.stringify(event.latLng));
//save existing array to localStorage
    localStorage.setItem('pottySpots', JSON.stringify(pottySpots));
//open revew form on second click
    google.maps.event.addListener(marker, 'click', function(event) {
      window.location = "reviews.html";
    });

  });

  }


//get pottySpots data from localStorage
var portapotties = localStorage.getItem('pottySpots');
if (portapotties) {
  pottySpots = JSON.parse(portapotties);
}

//showMarkers() to show an icon for each location in pottySpots array
function showMarkers() {
  for (var i=0; i < pottySpots.length; i++) {
    var marker = new google.maps.Marker({
      position: pottySpots[i].position,
      map: map,
      icon: image
    });
  }
}

//use port-a-potty image as icon on map
function makeIcon() {
  image = {
    url: "images/noun_982776_cc.png",
    scaledSize: new google.maps.Size(50,50),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0,0)
  };

}

//formula to calculate distance between two points on map, called in calculateDistance()
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

//calculates distance between user's location and locations in array.  re-runs on each page load.  inserts distance for each location into each object every time it loads.
function calculateDistance() {
  for (var i=0; i < pottySpots.length; i++){
    var distance = proximity(pos.lat, pos.lng, pottySpots[i].position.lat, pottySpots[i].position.lng);
    pottySpots[i].distance = distance;
  }
}

//formula to sort list on distance from user's location
function sortDistance(left, right) {
  if (left.distance < right.distance) {return -1}
  else if (left.distance > right.distance) {return 1}
  else {return 0}
}

//function to sort pottySpots on distance and display in order of closest to furthest
function sortPottyList() {
  sortedPotties = pottySpots.sort(sortDistance);
}

//display sorted list of 5 closest potties
function displayList() {
  var ulElement = document.createElement("ul");
  var spanTitle = document.createElement("span");
  spanTitle.innerText = "5 Stops Closest to You";
  spanTitle.setAttribute("id", "spanTitle");
  ulElement.appendChild(spanTitle);
  document.getElementById("displayList").appendChild(ulElement);
  var sortedList = pottySpots.sort(sortDistance);
  for (var i=0; i < 5; i++) {
    var liElement = document.createElement("li");
    var currentPotty = sortedList[i];
    liElement.innerText = currentPotty.title + " | Overall Rating: " + currentPotty.overall;
    liElement.dataset.title = currentPotty.title;
    liElement.setAttribute("class", "pottyList");
    ulElement.appendChild(liElement);
    liElement.addEventListener("click", displayTable);
  }
}

//display information for the clicked potty
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
  var row4 = document.createElement("tr");
  var commentElement = document.createElement("td");
  commentElement.setAttribute("colspan", "2");
  commentElement.innerText = "Comments: " + clicked.comment;
  row4.appendChild(commentElement);
  tableBody.appendChild(row4);
}

//clear table, identify clicked title and call the buildTable()
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

//function called in googlemaps.js
function generateList() {
  calculateDistance();
  sortPottyList();
  displayList();
}


window.addEventListener("load", makeIcon)
window.addEventListener("load", showMarkers)
window.addEventListener("load", addMapEventListeners)
