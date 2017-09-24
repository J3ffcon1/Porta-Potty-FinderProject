var pos, sortedPotties;

function initMap() {
  map = new google.maps.Map(document.getElementById('map_holder'), {
        center: {lat: 45.523 , lng: -122.681 },
        zoom: 16
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
      infoWindow.setContent('Find a stop near you');
      infoWindow.open(map);
      map.setCenter(pos);
      var marker = new google.maps.Marker({
        position: pos,
        map:map
      });
      generateList();
    }, function() {
      // handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    // handleLocationError(false, infoWindow, map.getCenter());
  }
}
// async defer
// src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBxM8Bh8A5SsoWYt1SL_LUpC3GMrCgzPzo&callback=initMap";
