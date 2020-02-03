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

function writeNewTeam() {
    // store input values in variables
    var teamType = document.getElementById("addTeamType").value;
    var teamName = document.getElementById("addTeamName").value;
    var quizzer1 = document.getElementById("addQuizzer1").value;
    var quizzer2 = document.getElementById("addQuizzer2").value;
    var quizzer3 = document.getElementById("addQuizzer3").value;
    var quizzer4 = document.getElementById("addQuizzer4").value;
    var quizzer5 = document.getElementById("addQuizzer5").value;
    // store new team object that can be pushed to database
    var newTeam = {
        type: teamType,
        teamName: teamName,
        qzr1: quizzer1,
        qzr2: quizzer2,
        qzr3: quizzer3,
        qzr4: quizzer4,
        qzr5: quizzer5
    };
    // add new team to database
    firebase.database().ref("Teams").push(newTeam);
    console.log(teamType);
    console.log(teamName);
    console.log(quizzer1);
    console.log(quizzer2);
    console.log(quizzer3);
    console.log(quizzer4);
    console.log(quizzer5);
    // clear inputs
    teamType = "";
    teamName = "";
    quizzer1 = "";
    quizzer2 = "";
    quizzer3 = "";
    quizzer4 = "";
    quizzer5 = "";
}

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