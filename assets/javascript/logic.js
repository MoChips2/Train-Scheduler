$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCF0d3wEZcIYcucVAjGuSUwedhGsfiojOI",
        authDomain: "train-scheduler-11216.firebaseapp.com",
        databaseURL: "https://train-scheduler-11216.firebaseio.com",
        projectId: "train-scheduler-11216",
        storageBucket: "train-scheduler-11216.appspot.com",
        messagingSenderId: "628144058434"
    };
    firebase.initializeApp(config);

    var dataRef = firebase.database();

    var name = "";
    var dest = "";
    var freq = "";
    var train1 = "";

    $("#add-train").on("click", function () {
        event.preventDefault();

        name = $("#train-name-input").val().trim();
        dest = $("#dest-input").val().trim();
        freq = $("#freq-input").val().trim();
        train1 = $("#first-input").val().trim(), "HH:mm";

        dataRef.ref().push({

            name: name,
            dest: dest,
            freq: freq,
            train1: train1,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })
        // console.log("new train stamp")
    });

    dataRef.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().dest);
        console.log(childSnapshot.val().freq);
        console.log(childSnapshot.val().train1);

        $("tbody").append("<tr><td id=name>"
            + childSnapshot.val().name + "</td><td id=dest>"
            + childSnapshot.val().dest + "</td><td id=freq>"
            + childSnapshot.val().freq + "</td><td id=1stTrain>"
            + childSnapshot.val().train1 + "</td><td>"
            + "Paul BLart" + "</td><td>"
            + "<input type='button' value='remove' class='remove-t btn btn-success'>"
            + "</td></tr>"
        )
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    })

   /* dataRef.ref().orderByChild("dateAdded").limitToLast1().on("child_added", function (childSnapshot) {
        $("#name").text(childSnapshot.val().name);
        $("#dest").text(childSnapshot.val().dest);
        $("#freq").text(childSnapshot.val().freq);
        $("#1stTrain").text(childSnapshot.val().train1);
    })  */



    // make remove button functional here
    $(".table").on("click", ".remove-t", function () {
        $(this).closest('tr').remove();
           deleteKey = $(this).parent().attr
    })

})


