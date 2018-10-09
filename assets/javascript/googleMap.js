function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 33.7490, lng: -84.3880}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('search-btn').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var contentString = '<div>' + address + '</div>';
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}