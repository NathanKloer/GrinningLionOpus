$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDcy6KUvKqXpNWI65gnl57TF-pQL57FlWs",
        authDomain: "pet-finder-8e4bf.firebaseapp.com",
        databaseURL: "https://pet-finder-8e4bf.firebaseio.com",
        projectId: "pet-finder-8e4bf",
        storageBucket: "pet-finder-8e4bf.appspot.com",
        messagingSenderId: "67912018638"
    };
    firebase.initializeApp(config);

    // Initialize variables
    var database = firebase.database();
    var type = "";
    var firstName = "";
    var lastName = "";
    var email = "";
    var petName = "";
    var species = "";
    var upload = "";
    var imageURL = "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjVgoTE8O3dAhXF3lMKHTBiDZYQjRx6BAgBEAU&url=https%3A%2F%2Fwiscoyforanimals.com%2Fdepartments%2F1024%2Fcat&psig=AOvVaw0uShJLYJxI-xBbhQ7goRcN&ust=1538780044957789";
    var coatColors = ["black", "brown"];
    var latitude = 0;
    var longitude = 0;
    var address = "";
    var addressTwo = "";
    var city = "";
    var state = "";
    var zip = 0;
    var comments = "";

    // Handle image upload
    file.done(function(fileInfo) {
        // Upload has successfully completed and a file is ready.
        console.log(response);
      }).fail(function(error, fileInfo) {
        // Upload failed, or something else went wrong, a file is not ready.
      });

    // Handle geolocation button
    $("#geolocation").on("click", function(event) {
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log(longitude);
            console.log(latitude);
        });
    });

    // Handle submission button
    $("#submit-form").on("click", function(event) {
        event.preventDefault();

        // Capture inputs in variables
        firstName = $("#firstName").val().trim();
        lastName = $("#lastName").val().trim();
        email = $("#emailInput").val().trim();
        petName = $("#petName").val().trim();
        species = $("#selectSpecies").val().trim();
        upload = $("upload-care");

        address = $("#inputAddress").val().trim();
        addressTwo = $("#inputAddress2").val().trim();
        city = $("#inputCity").val().trim();
        state = $("#inputState").val().trim();
        zip = $("#inputZip").val().trim();
        comments = $("#comments").val().trim();

        // Store in object
        var newPet = {
            storedFirstName: firstName,
            storedLastName: lastName,
            storedEmail: email,
            storedPetName: petName,
            storedSpecies: species,
            /* storedUpload: upload, */
            storedImageURL: imageURL,
            storedCoatColors: coatColors,
            storedLatitude: latitude,
            storedLongitude: longitude,
            storedAddress: address,
            storedAddressTwo: addressTwo,
            storedCity: city,
            storedState: state,
            storedZip: zip,
            storedComments: comments
        }
        console.log(newPet);

        // Store in Firebase
        database.ref().push(newPet);

        // Display success modal for 5 seconds

        // Clear form
        $("#firstName").val("");
        $("#lastName").val("");
        $("#emailInput").val("");
        $("#petName").val("");
        $("#selectSpecies").val("");
        
        $("#inputAddress").val("");
        $("#inputAddress2").val("");
        $("#inputCity").val("");
        $("#inputState").val("");
        $("#inputZip").val("");
        $("#comments").val("");

        // Handle errors
    });
});