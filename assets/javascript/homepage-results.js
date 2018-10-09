//At the bottom of the homepage I will add a container to hold nearby info
//User must click allow my location at top of page
//container updates with map showing markers with all lost/found pets in their zip code
//a list of all lost pets and found pets appears beneath it

//.on click event for button on homepage
function initMap() {
    var lng;
    var lat;
    
    $("#allow-location").on("click", function(event) {
        //geolocation API info
        //get geolocation
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
        console.log(lng);
        console.log(lat);
        //pass long/lat into google maps geocoder to produce address object
    
        var latlng = lat +", "+ lng;
        var geocoder = new google.maps.Geocoder();
    
        console.log(latlng);
    
        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    console.log(results);            }
            } 
    
        //var apiKey = "AIzaSyDih4ABc71Ro_cOeGYzqwmlq-TdalNnILU";
        //var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "=" + apiKey;
        //$.ajax({
            //url: queryURL,
            //method: "GET"
        //}).then(function(response) {
    
            //console.log(response);
    
            //var results = response.data;
            //create var to hold zip code from object
            //var zipCode = results.results[0].address_components[7].short_name;
            //console.log(zipCode);
        });
    });
    
    });
    }
    
    //I need to compare zipCode to all zips for stored animals and then append DOM for each
    //append DOM at pet dump container with results
    
    //either isaac will pull this part or me but the map should be created first using long-lat (stretch goal)