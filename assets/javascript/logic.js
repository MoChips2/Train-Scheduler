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
    var realTimeFormat;
    var trainTime;
    var trainTdiff;
    var minAway = "";
    var nextTrainTime;
   // var childSnapshot = "";

    $("#add-train").on("click", function () {
        event.preventDefault();

        name = $("#train-name-input").val().trim();
        dest = $("#dest-input").val().trim();
        freq = $("#freq-input").val().trim();
        train1 = $("#first-input").val().trim();

        
        realTimeFormat = moment(train1, "HH:mm").subtract(24, 'h')
        trainTime = moment().diff(moment(realTimeFormat), "m")
        trainTdiff = trainTime % freq;
        minAway = freq - trainTdiff;
        // console.log(minAway)
        nextTrainTime = moment(moment().add(minAway, 'm')).format("HH:mm");
        // console.log(nextTrainTime);


        dataRef.ref().push({

            name: name,
            dest: dest,
            freq: freq,
            train1: train1,
            minAway : minAway,
            nextTrainTime: nextTrainTime,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })
        // console.log("new train")
        
    });

    dataRef.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().dest);
        console.log(childSnapshot.val().freq);
        console.log(childSnapshot.val().train1);
        console.log(childSnapshot.val().minAway);
        console.log(childSnapshot.val().nextTrainTime); 

        $("tbody").append("<tr><td id=name>"
            + childSnapshot.val().name + "</td><td id=dest>"
            + childSnapshot.val().dest + "</td><td id=freq>"
            + childSnapshot.val().freq + "</td><td id=nextTrain>"
            + childSnapshot.val().nextTrainTime + "</td><td>"
            + childSnapshot.val().minAway + "</td><td>"
            + "<button class='remove-t btn btn-success'>remove</button>"
            + "</td></tr>"
        )


        // remove button functional, can remove from DOM, not from Firebase
        var key = Object(childSnapshot.val());
        // console.log(key);
        $(".table").on("click", ".remove-t", function () {
            $(this).closest('tr').remove();
            $(key).remove();
        }) 
    }
, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
})
})

    /*  dataRef.ref().orderByChild("dateAdded").limitToLast1().on("child_added", function (childSnapshot) {
          $("#name").text(childSnapshot.val().name);
          $("#dest").text(childSnapshot.val().dest);
          $("#freq").text(childSnapshot.val().freq);
          $("#1stTrain").text(childSnapshot.val().train1);
      }) */


    



