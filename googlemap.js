//Declaring variables for usage//
var pos, sortedPotties;

//Intitial function placing origin marker on map//
function initMap() {
  map = new google.maps.Map(document.getElementById('map_holder'), {
        center: {lat: 45.523 , lng: -122.681 },
        zoom: 16
  });

//Allows for the map stylers to be made invisible for easier viewing//
  map.setOptions({
    styles:[
      {
        featureType: 'poi.business',
        stylers: [{visibility: 'off'}]
      },
    ]
  })

//Generating window for map to display//
  infoWindow = new google.maps.InfoWindow;

//Function grabs the current location of the user and displays it on the map//
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Find a stop near you');
      infoWindow.open(map);
      map.setCenter(pos);
      var marker = new google.maps.Marker({
        position: pos,
        map:map
      });
      generateList();
    }, function() {
//Code breaking without function in place. Possible API code issue//
    });
  } else {
//Code breaking without function in place. Possible API code issue//
  }
}
