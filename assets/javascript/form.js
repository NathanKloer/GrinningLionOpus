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
    var imageURL = "";
    var coatColors = [];
    var latitude = 0;
    var longitude = 0;
    var address = "";
    var addressTwo = "";
    var city = "";
    var state = "";
    var zip = 0;
    var comments = "";

    // Handle geolocation button
    $("#geolocation").on("click", function(event) {
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log(longitude);
            console.log(latitude);
        });
    });

    // Handle form validaton
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        else { 
            if ($("#upload-care").attr("value") === "") {
                event.preventDefault();
                $("#upload-validation").show();
            }
            else {
                handleSubmit(event);
            }
        }
        form.classList.add('was-validated');
    }, false);
    });

    // Handle submission
    function handleSubmit (event) {
        event.preventDefault();

        // Handle geocode validation

        // Capture inputs in variables
        type = $("#lost-or-found").attr("lostorfound");
        firstName = $("#firstName").val().trim();
        lastName = $("#lastName").val().trim();
        email = $("#emailInput").val().trim();
        petName = $("#petName").val().trim();
        species = $("#selectSpecies").val().trim();
        imageURL = $("#upload-care").attr("value");
        $.each($("#coat-color option:selected"), function() {            
            coatColors.push($(this).val());
        });
        address = $("#inputAddress").val().trim();
        addressTwo = $("#inputAddress2").val().trim();
        city = $("#inputCity").val().trim();
        state = $("#inputState").val().trim();
        zip = $("#inputZip").val().trim();
        comments = $("#comments").val().trim();

        // Store in object
        var newPet = {
            storedType: type,
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
        $("#upload-care").attr("value", "");
        $(".uploadcare--widget__button_type_open").css({"display": "inline-block"});
        $(".uploadcare--widget__file-name").css({"display": "none"});
        $(".uploadcare--widget__file-size").css({"display": "none"});
        $("#upload-validation").hide();
        $("#coatColor").val("");
        $("#inputAddress").val("");
        $("#inputAddress2").val("");
        $("#inputCity").val("");
        $("#inputState").val("");
        $("#inputZip").val("");
        $("#comments").val("");
        // Handle errors
    }
});