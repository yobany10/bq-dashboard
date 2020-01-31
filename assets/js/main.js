function writeData() {
    firebase.database().ref("User").set({
         name: document.getElementById("nameField").value,
         age: document.getElementById("ageField").value
    })
    getData();
};

function writeQuiz() {
    firebase.database().ref("Quizzes").set({
         redTeam: document.getElementById("rTeamName").value,
         yellowTeam: document.getElementById("yTeamName").value
    })
};

function getData() {
     firebase.database().ref('/').once('value', function(snapshot) {
         snapshot.forEach(function(childSnapshot)
         {
            var childKey =  childSnapshot.key;
            var childData = childSnapshot.val();
            document.getElementById("data").innerHTML = childData["name"] + ", " + childData["age"];
         })
     })
};