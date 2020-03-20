// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCMGwqr9TXCHKXhhPH76oIfqXgxHLxH0ew",
    authDomain: "bq-dashboard-4cbc9.firebaseapp.com",
    databaseURL: "https://bq-dashboard-4cbc9.firebaseio.com",
    projectId: "bq-dashboard-4cbc9",
    storageBucket: "bq-dashboard-4cbc9.appspot.com",
    messagingSenderId: "156585888675",
    appId: "1:156585888675:web:d66ed9c34de8c6da74e816",
    measurementId: "G-PNPM35EZYQ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

// Function used to change the data for name and age under the "User" collection in the database
function writeData() {
    firebase.database().ref("User").set({
         name: document.getElementById("nameField").value,
         age: document.getElementById("ageField").value
    })
};

// Function that adds new teams to the "Teams" collection in the database
function writeNewTeam() {
    // store input values in variables
    var teamType = document.getElementById("addTeamType").value;
    var teamName = document.getElementById("addTeamName").value;
    var coach1 = document.getElementById("addCoach1").value;
    var coach2 = document.getElementBy1Id("addCoach2").value;
    var quizzer1 = document.getElementById("addQuizzer1").value;
    var quizzer2 = document.getElementById("addQuizzer2").value;
    var quizzer3 = document.getElementById("addQuizzer3").value;
    var quizzer4 = document.getElementById("addQuizzer4").value;
    var quizzer5 = document.getElementById("addQuizzer5").value;
    var qzrAmount = 0;
    if(quizzer1.trim().length == 0) {
        qzrAmount = qzrAmount + 0;
    } else {
        qzrAmount = qzrAmount + 1;
    };
    if(quizzer2.trim().length == 0) {
        qzrAmount = qzrAmount + 0;
    } else {
        qzrAmount = qzrAmount + 1;
    };
    if(quizzer3.trim().length == 0) {
        qzrAmount = qzrAmount + 0;
    } else {
        qzrAmount = qzrAmount + 1;
    };
    if(quizzer4.trim().length == 0) {
        qzrAmount = qzrAmount + 0;
    } else {
        qzrAmount = qzrAmount + 1;
    };
    if(quizzer5.trim().length == 0) {
        qzrAmount = qzrAmount + 0;
    } else {
        qzrAmount = qzrAmount + 1;
    };
    // store new team object that can be pushed to database
    var newTeam = {
        type: teamType,
        teamName: teamName,
        coach1: coach1,
        coach2: coach2,
        qzr1: quizzer1,
        qzr2: quizzer2,
        qzr3: quizzer3,
        qzr4: quizzer4,
        qzr5: quizzer5,
        qzrAmount: qzrAmount
    };
    // add new team to database
    firebase.database().ref("Teams").push(newTeam);
    console.log("New team added!");
    console.log(teamType);
    console.log(teamName);
    console.log(quizzer1);
    console.log(quizzer2);
    console.log(quizzer3);
    console.log(quizzer4);
    console.log(quizzer5);

    alert(teamName + " has been added successfully!");

};

    // Firebase event triggered everytime data gets added to 'Teams/' in the database
    firebase.database().ref('Teams/').on("child_added", function(snapshot) {
        console.log(snapshot.val());
        // Grab UL from DOM
        var list = document.getElementById("teamsList");
        // Create new list item element
        var createListItem = document.createElement('li');
        // Add team name to new list item
        createListItem.appendChild(document.createTextNode(snapshot.val().teamName));
        // Add class to new list item
        createListItem.className = "list-group-item d-flex justify-content-between align-items-center"
        // Add new list item to UL from DOM
        list.appendChild(createListItem);
        
        // I need to append this span to the list items
        var createBadgeItem = document.createElement("span");
        createBadgeItem.className = "badge badge-warning badge-pill";
        createBadgeItem.innerHTML = snapshot.val().qzrAmount + " quizzers";
        createListItem.appendChild(createBadgeItem);
    });

    // Firebase event that retrieves data and displays it
    firebase.database().ref('/').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot)
        {
           var childKey =  childSnapshot.key;
           var childData = childSnapshot.val();
           document.getElementById("data").innerHTML = "Name: " + childData["name"] + "<br>" + "Age: " + childData["age"];
        })
    })

    // Quiz interface logic
    var team1Score = 0;
    var team2Score = 0;
    var team1Name = "";
    var team2Name = "";