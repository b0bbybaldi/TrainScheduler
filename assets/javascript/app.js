
// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyCoRiGswj2VemLHtIaU_8MFWP3dmAAOLvs",
  authDomain: "trainscheduler-dce9d.firebaseapp.com",
  databaseURL: "https://trainscheduler-dce9d.firebaseio.com",
  projectId: "trainscheduler-dce9d",
  storageBucket: "",
  messagingSenderId: "589296495761"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-traub-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var tName = $("#train-name-input").val().trim();
  var tDestination = $("#destination-input").val().trim();
  var tFirst = moment($("#firstTrainTime-input").val().trim(), "DD/MM/YY").format("X");
  var tFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: tName,
    destination: tDestination,
    first: tFirst,
    frequency: tFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTrainTime-input").val("");
  $("#frequency-input").val("");

});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tDestinaton = childSnapshot.val().destination;
  var tStart = childSnapshot.val().first;
  var tFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(tName);
  console.log(tDestination);
  console.log(tFirst);
  console.log(tFrequency);

  // Prettify the next train time
  var trainETAPretty = roundup(moment().diff(moment.unix(tFirst, "X"), "hours")/tFrequency, 0) + moment.unix(tFirst, "X"), "hours";

// .format("HH:mm") ;

  // Calculate the time for next train ETA using hardcore math
  var nextTrain = moment().diff(moment.unix(trainETAPretty, "X"), "minutes");
  console.log(nextTrain);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
  tFrequency + "</td><td>" + trainETAPretty + "</td><td>" + nextTrain + "</td></tr>");
});
