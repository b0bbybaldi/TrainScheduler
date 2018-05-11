
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
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var tName = $("#train-name-input").val().trim();
  var tDestination = $("#destination-input").val().trim();
  var tFirst = $("#first-train-input").val().trim();
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
  $("#first-train-input").val("");
  $("#frequency-input").val("");

});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFirst = childSnapshot.val().first;
  var tFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(tName);
  console.log(tDestination);
  console.log(tFirst);
  console.log(tFrequency);

  // Prettify the first train time
  
  var initial = moment(tFirst, "HH:mm");

  // Calculate the time for next train ETA using hardcore math

  var sinceFirst = moment().diff(initial, "minutes");

  var sinceLast = sinceFirst % tFrequency;

  var nextTrain = tFrequency - sinceLast;
  console.log(nextTrain)
  
  var tillNext = moment().add(nextTrain,"minutes");

  var trainETAPretty = tillNext.format("HH:mm");
  console.log(trainETAPretty)

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
  tFrequency + "</td><td>" + trainETAPretty + "</td><td>" + nextTrain + "</td></tr>");
});
