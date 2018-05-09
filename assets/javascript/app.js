
// 1. Initialize Firebase
//var config = {


var database = firebase.database();

// 2. Button for adding Trains
$("#add-traub-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var tName = $("#train-name-input").val().trim();
  var tDestination = $("#destination-input").val().trim();
  var tStart = moment($("#firstTrainTime-input").val().trim(), "DD/MM/YY").format("X");
  var tFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: tName,
    destination: tDestination,
    start: tStart,
    frqeuency: tFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
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
  var tStart = childSnapshot.val().start;
  var tFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(tName);
  console.log(tDestination);
  console.log(tStart);
  console.log(tFrequency);

  // Prettify the employee start
  var trainStartPretty = moment.unix(tStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trainMonths = moment().diff(moment.unix(tStart, "X"), "months");
  console.log(trainMonths);

  // Calculate the total billed rate
  var tBilled = trainMonths * tFrequency;
  console.log(tBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
  trainStartPretty + "</td><td>" + trainMonths + "</td><td>" + tFrequency + "</td><td>" + tBilled + "</td></tr>");
});
