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
    var firstName = "";
    var lastName = "";
    var email = "";
    var petName = "";
    var species = "";
    var imageURL = "";
    var coatColors = "";
    var latitude = 0;
    var longitude = 0;
    var address = "";
    var addressTwo = "";
    var city = "";
    var state = "";
    var zip = 0;
    var comments = "";
    console.log(firstName);

    // Handle button click
    $("#submit-form").on("click", function(event) {
        event.preventDefault();

        // Capture inputs in variables
        firstName = $("#first-name").val().trim();
        console.log(firstName);
        lastName = $("#lastName").val().trim();
        email = $("#emailInput").val().trim();
        petName = $("#petName").val().trim();
        species = $("#selectSpecies").val().trim();
        
        address = $("#inputAddress").val().trim();
        addressTwo = $("#inputAddress2").val().trim();
        city = $("#inputCity").val().trim();
        state = $("#inputState").val().trim();
        zip = $("#inputZip").val().trim();
        comments = $("#comments").val().trim();
        console.log(firstName);

        // Store in object
        var newPet = {
            storedFirstName: firstName,
            storedLastName: lastName,
            storedEmail: email,
            storedPetName: petName,
            storedSpecies: species,
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
    },  function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
    });
});