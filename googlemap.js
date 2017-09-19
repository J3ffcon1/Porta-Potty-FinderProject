var map, infoWindow, pos, sortedPotties;
function initMap() {
  map = new google.maps.Map(document.getElementById('map_holder'), {
    center: {lat: 45.523 , lng: -122.681 },
    zoom: 16,
  });

  map.setOptions({
    styles:[
      {
        featureType: 'poi.business',
        stylers: [{visibility: 'off'}]
      },
      // {
      //   featureType: 'transit',
      //   elementType: 'labels.icon',
      //   stylers: [{visibility: 'off'}]
      // }
    ]
  })

  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Find a seat near you');
      infoWindow.open(map);
      map.setCenter(pos);
      var marker = new google.maps.Marker({
        position: pos,
        map:map
      });
      generateList();
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
