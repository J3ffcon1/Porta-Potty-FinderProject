var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map_holder'), {
        center: {lat: 45.523 , lng: -122.681 },
        zoom: 16
  });
}
// async defer
// src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBxM8Bh8A5SsoWYt1SL_LUpC3GMrCgzPzo&callback=initMap";
