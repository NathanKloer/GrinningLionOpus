config = {
    apiKey: "AIzaSyDcy6KUvKqXpNWI65gnl57TF-pQL57FlWs",
    authDomain: "pet-finder-8e4bf.firebaseapp.com",
    databaseURL: "https://pet-finder-8e4bf.firebaseio.com",
    projectId: "pet-finder-8e4bf",
    storageBucket: "pet-finder-8e4bf.appspot.com",
    messagingSenderId: "67912018638"
};
firebase.initializeApp(config);

var database = firebase.database();

//website reads database when laded, and identifies the relevent fields. This is done to solve scope issues
//that happened when it was put inside the .on(click) event


database.ref().on("child_added", function (childSnapshot) {

    firstName = childSnapshot.val().storedFirstName;
    lastName = childSnapshot.val().storedLastName;
    email = childSnapshot.val().storedEmail;
    petName = childSnapshot.val().storedPetName;
    species = childSnapshot.val().storedSpecies;
    imageURL = childSnapshot.val().storedImageURL;
    coatColors = childSnapshot.val().storedCoatColors;
    latitude = childSnapshot.val().storedLatitude;
    longitude = childSnapshot.val().storedLongitude;
    address = childSnapshot.val().storedAddress;
    addressTwo = childSnapshot.val().storedAddressTwo;
    city = childSnapshot.val().storedCity;
    state = childSnapshot.val().storedState;
    zip = childSnapshot.val().storedZip;
    comments = childSnapshot.val().storedComments;

    //creates an array bin for data
    var accountsArray = [];
    //accountsArray.push

    console.log("(O)-=-=-=-=[ Account Information Relavent to Search ]=-=-=-=-(O)");
    //put childSnapshot data into array
    //for (var i=0; i < 1; i++) {

    accountsArray.push(firstName + " " + lastName, species, zip, coatColors, petName, email, comments,
     imageURL, address, addressTwo, city, state, zip);

    //JSON.stringify(accountsArray);
    //}
    //var coatColorArr = new Array(coatColors) 
    //var speciesArr = new Array(species) 
    //var zipArr = new Array(zip)

    //$("#coat-color option:selected").each(function () {
    //petColor.push(this.value);
    //});

    //var i
    //for (i = 0; i < accountArray.length; i++) {
    //accountsArray.push(vvvvvvvvvvvvvvvvvvvvvvvvi)
    //console.log(i)

    //console.log(database.ref("pet-finder-8e4bf").storedFirstName)


    console.log("Name " + firstName + " " + lastName);
    var coatArr = [];
    coatArr.push(JSON.stringify(coatColors));
    for (i = 0; i < coatArr.length; i++) {
    (console.log("Coat Colors: " + coatArr[i])) 
    //coatColors = undefined
    };
    console.log("Species: " + accountsArray[1]);
    console.log("Zip: " + accountsArray[2]);
    console.log("Search info in Array [" + accountsArray + "]");



    // get the options for Lost/Found, species, and make an array for the colors


    $("#search-btn").on("click", function (event) {

        //console.clear()

        //console.log("snapshot", firstName)
        // Handle errors

        event.preventDefault();

        //variables to store values
        var petStatus = ""
        var petSpecies = ""
        //Lost Or Found Input Value
        var lostOrFound = $("#selectStatus option:selected").val();
        if (lostOrFound === "1") {
            petStatus = "Lost"
        } else {
            petStatus = "Found"
        };
        //Cat Or Dog Input Value
        var catOrDog = $("#selectSpecies option:selected").val();
        if (catOrDog === "1") {
            petSpecies = "Cat"
        } else {
            petSpecies = "Dog"
        };
        //Pet Color Input Value
        var petColor = []
        $("#coat-color option:selected").each(function () {
            petColor.push(this.value)
        })
        //Zip Input Value
        var inputZip = $("#inputZip").val();

        //Temporary/Local Storage of Data
        var newSearch = {
            status: petStatus,
            species: petSpecies,
            color: petColor,
            tempZip: inputZip,
        }

        //hitting the submit key should match should console.log accounts that match the search input species. 
        //If an Account Matches, it will appear in the console.log
        //I think there might be something wrong with the form? I had to delete some
        //of the color entries from firebase but it may have messed with the value
        //of the array

        var searchFilter = " "
        var zipResult = " "
        //var coatArrLength = coatArr.length
        //var newSearchColorLength = accountsArray[3].length
        console.log("=====Search Filter=====")
        //console.log(accountsArray[3], accountsArray[3].length)
        console.log(accountsArray[0] + " lost a " + accountsArray[3] + " " + accountsArray[1])

        if (newSearch.species === accountsArray[1]) {
            console.log("[~~Species Match!~~]");
            var speciesResult = true
        } else {
            console.log("no species match")
            var speciesResult = false
        }
        //console.log(JSON.stringify(coatArr).includes(newSearch.color))
        if (petColor.length === 1) {
            if (JSON.stringify(coatArr).includes(newSearch.color[0]) === true
            && accountsArray[3].length === 1) {
                console.log("[~~Color Match!~~]")
                var coatResult = true
            } else if (JSON.stringify(coatArr).includes(newSearch.color[0]) == false) {
                console.log("color 1 (" + newSearch.color[0] + ") = does not match")
                var coatResult = false
            }
        } else if (petColor.length === 2) {
            if (JSON.stringify(coatArr).includes(newSearch.color[0]) === true
                && JSON.stringify(coatArr).includes(newSearch.color[1]) === true) {
                console.log("[~~Color Match!~~]")
                var coatResult = true
            } else if (JSON.stringify(coatArr).includes(newSearch.color[0]) == false
                && JSON.stringify(coatArr).includes(newSearch.color[1]) == false) {
                console.log("a does not match")
                var coatResult = false
            }
        } else if (petColor.length === 3) {
            if (JSON.stringify(coatArr).includes(newSearch.color[0]) === true
                && JSON.stringify(coatArr).includes(newSearch.color[1]) === true
                && JSON.stringify(coatArr).includes(newSearch.color[2]) === true) {
                console.log("[~~Color Match!~~]")
                var coatResult = true
            } else if (JSON.stringify(coatArr).includes(newSearch.color[0]) == false
                && JSON.stringify(coatArr).includes(newSearch.color[1]) == false
                && JSON.stringify(coatArr).includes(newSearch.color[2]) == false) {
                console.log("a does not match")
                var coatResult = false
            }
        } 


            if (
                coatResult == true && speciesResult == true
            ) {

            var listingHolder = $("#empty-field");

            var newPetDiv = $("<div>");
            newPetDiv.addClass("card-body")

            var newRowDiv = $("<div>");
            newRowDiv.addClass("row");

            var newImageDiv = $("<div>");
            newImageDiv.addClass("col-lg-4");
            var newImage = $("<img>");
            newImage.attr("src", accountsArray[7]);
            newImage.addClass("profile-image");
            newImageDiv.append(newImage);

            var newInfoDiv = $("<div>");
            newInfoDiv.addClass("col-lg-8");

                var newResultsDiv = $("<div>");
                newResultsDiv.addClass("pet-result-info");

                    var newTitleDiv = $("<div>");
                    newTitleDiv.addClass("pet-title");
                    var newTitleP = $("<p>");
                    newTitleP.text(petStatus + " " + petSpecies);
                    newTitleDiv.append(newTitleP);
                    newResultsDiv.append(newTitleDiv);

                    var petNameDiv = $("<div>");
                    var petNameP = $("<p>");
                    petNameP.text("Pet Name: " + accountsArray[4]);
                    petNameDiv.append(petNameP);
                    newResultsDiv.append(petNameDiv);

                    var personNameDiv = $("<div>");
                    var personNameP = $("<p>");
                    personNameP.text(accountsArray[0]);
                    personNameDiv.append("Contributor: " + accountsArray[0]);
                    newResultsDiv.append(personNameDiv);


                    var emailDiv = $("<div>");
                    var emailP = $("<p>");
                    emailP.text("Contact: " + accountsArray[5]);
                    emailDiv.append(emailP);
                    newResultsDiv.append(emailDiv);

                    var colorDiv = $("<div>");
                    var colorP = $("<p>");
                    colorP.text("Coat Color: " + coatArr);
                    colorDiv.append(colorP);
                    newResultsDiv.append(colorDiv);

                    var addressDiv = $("<div>");
                    var mainaddressDiv = $("<div>");
                    var mainAddressP = $("<p>");
                    mainAddressP.text("Last Seen Near: " + accountsArray[8]);
                    mainaddressDiv.append(mainAddressP);
                    addressDiv.append(mainaddressDiv);
                    var secondaddressDiv = $("<div>");
                    var secondAddressP = $("<p>");
                    secondAddressP.text(accountsArray[9]);
                    secondaddressDiv.append(secondAddressP);
                    addressDiv.append(secondaddressDiv);
                    var lastaddressDiv = $("<div>");
                    var lastAddressP = $("<p>");
                    lastAddressP.text(accountsArray[10] + " " + accountsArray[11] + " " + accountsArray[12]);
                    lastaddressDiv.append(lastAddressP);
                    addressDiv.append(lastaddressDiv);
                    newResultsDiv.append(addressDiv);

                    var commentsDiv = $("<div>");
                    var commentsP = $("<p>");
                    commentsP.text("Comments: " + accountsArray[6]);
                    commentsDiv.append(commentsP);
                    newResultsDiv.append(commentsDiv);
                    
                newInfoDiv.append(newResultsDiv);

            var newMapDiv = $("<div>");
            newMapDiv.addClass("col-lg-4 map");
            //add map

            newRowDiv.append(newImageDiv);
            newRowDiv.append(newInfoDiv);
            newRowDiv.append(newMapDiv);
            newPetDiv.append(newRowDiv);  
            listingHolder.append(newPetDiv);   
            };

            // $("#pet-table > tbody").append(newRow);

            //else {console.log("color 3 No Match")
            //console.log("Searched Color: " + newSearch.color[2])
            //console.log("Account: " + accountsArray)}}
            //accountsArray.indexOf(newSearch.color, 3) === "0"
            //){console.log("color 3(" + newSearch.color[2] + ") = Match" )}
            //else {console.log("Account Color/s: " + coatArr)
            //console.log("Searched Color: " + newSearch.color[2])};

            //console.log("indexOf1 = " + newSearch.color);
            //console.log("indexOf2 = " + coatArr.indexOf(coatArr[1]));
            //console.log("indexOf3 = " + coatArr.indexOf(coatArr[2]));

            //){
            //    coatResult = 1;
            //} else {
            //    coatResult = 0;
            //}



            //when run by hitting submit, this will display accounts that match species. 

            //console.log("Color: " + coatArr);
            //console.log("Color Searched: " + newSearch.color);
            //console.log("Status: " + newSearch.status);
            //console.log("Zip: " + newSearch.tempZip);


            // Change the HTML to reflect




            //console.log("~~~~~~~Search Match~~~~~~~ = True!");;

            //else {console.log("[xNo_Matchx]")
            //};



            //coatColors = undefined
        });

    //grab data from firebase
    //database.ref().on("child_added", function (childSnapshot) {

    //firstName = childSnapshot.val().storedFirstName;
    //lastName = childSnapshot.val().storedLastName;
    //email = childSnapshot.val().storedEmail;
    //petName = childSnapshot.val().storedPetName;
    //species = childSnapshot.val().storedSpecies;
    //imageURL = childSnapshot.val().storedImageURL;
    //coatColors = childSnapshot.val().storedCoatColors;
    //latitude = childSnapshot.val().storedLatitude;
    //longitude = childSnapshot.val().storedLongitude;
    //address = childSnapshot.val().storedAddress;
    //addressTwo = childSnapshot.val().storedAddressTwo;
    //city = childSnapshot.val().storedCity;
    //state = childSnapshot.val().storedState;
    //zip = childSnapshot.val().storedZip;
    //comments = childSnapshot.val().storedComments;

    //trying to pull firebase data (coatColors, species, zip)
    //so I can create a loop to compare to user data above
    //accountsArray is storing data from

    //var accountsArray = [];
    //accountsArray.push

    //console.log("~~~~~~~~~Account Information Relavent to Search~~~~~~~~~")
    //for (var i=0; i < 1; i++) {
    //accountsArray.push(firstName + " " + lastName, coatColors, species, zip)
    //}
    //var coatColorArr = new Array(coatColors) 
    //var speciesArr = new Array(species) 
    //var zipArr = new Array(zip)

    //$("#coat-color option:selected").each(function () {
    //petColor.push(this.value);
    //});

    //var i
    //for (i = 0; i < accountArray.length; i++) {
    //accountsArray.push(vvvvvvvvvvvvvvvvvvvvvvvvi)
    //console.log(i)

    //console.log(database.ref("pet-finder-8e4bf").storedFirstName)
    //console.log("~~" + firstName + " " + lastName + "~~");
    //console.log("Coat Colors: " + coatColors);
    //console.log("Species: " + species);
    //console.log("Zip: " + zip)
    //console.log("Search info in Array ["  + accountsArray +"]")
});