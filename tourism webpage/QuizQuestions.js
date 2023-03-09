var questionNo = 0;
var score = 0;
var TimePassed = 0;
var timeLimit = 1 * 60;
var timeRemaining = timeLimit;
var Sound = new Audio("NextButton.wav");
var set_time;

function endQuiz() {
  if (score < 0) {
    document.getElementById("OutcomeBox").style.backgroundColor = "black";
  } else if (score < 10) {
    document.getElementById("OutcomeBox").style.backgroundColor = "#FF8C00";
  } else {
    document.getElementById("OutcomeBox").style.backgroundColor = "#7CFC00";
  }

  clearInterval(set_time);
  document.getElementById("QuizBox").style.display = "none";
  document.getElementById("OutcomeBox").style.display = "";
}
function sound() {
  Sound.play();
}

function startQuiz() {
  set_time = setInterval(quizTimer, 1000);
  document.getElementById("BeginBox").style.display = "none";
  document.getElementById("QuizBox").style.display = "";
}

function quizTimer() {
  timeRemaining--;
  var elapsedTimeSecs = timeLimit - timeRemaining;
  var dMinutes = Math.floor(timeRemaining / 60);
  var dSeconds = timeRemaining % 60;
  if (dSeconds < 10) {
    dSeconds = "0" + dSeconds;
  }

  var displayTime = "0" + dMinutes + ":" + dSeconds;
  var elapsedTimeSecs = timeLimit - timeRemaining;
  var eMinutes = Math.floor(elapsedTimeSecs / 60);
  var eSeconds = elapsedTimeSecs % 60;

  if (eSeconds < 10) {
    eSeconds = "0" + eSeconds;
  }
  TimePassed = "0" + eMinutes + ":" + eSeconds;

  if (timeRemaining < 10) {
    document.getElementById("Time_count");
  }
  document.getElementById("Time_count").innerHTML = displayTime;

  if (timeRemaining == 0) {
    document.getElementById("AlertText").innerHTML =
      "TIME UP !!!<br>Your score<br>" + score + " of 20<br>";
    endQuiz();
  }
}

function setQuestion(n) {
  document.getElementById("question").innerHTML =
    " &nbsp&nbsp" + (n + 1) + ".&nbsp&nbsp" + QuesArray[n].Que;
  document.getElementById("Answer1").innerHTML = QuesArray[n].Answ1;
  document.getElementById("Answer2").innerHTML = QuesArray[n].Answ2;
  document.getElementById("Answer3").innerHTML = QuesArray[n].Answ3;
  document.getElementById("Answer4").innerHTML = QuesArray[n].Answ4;
}
function nextQuestion() {
  var selectedOption = document.querySelector("input[type=radio]:checked");

  if (selectedOption) {
    QuesArray[questionNo].ua = document.getElementById(
      "Answer" + selectedOption.value
    ).innerHTML;
    if (QuesArray[questionNo].ua == QuesArray[questionNo].CrctAns) {
      score += 2;
    } else {
      score -= 1;
    }
    selectedOption.checked = false;
  }
  if (questionNo == 9) {
    document.getElementById("AlertText").innerHTML =
      "Your score :<br>" + score + " of 20<br>Time Elapsed: " + TimePassed;
    endQuiz();
    return;
  }
  questionNo++;
  setQuestion(questionNo);
}

function reviewSummary() {
  for (var x = 1; x <= 10; x++) {
    if (QuesArray[x - 1].ua == QuesArray[x - 1].CrctAns) {
      document.getElementById("Que" + x).innerHTML =
        x +
        ". " +
        QuesArray[x - 1].Que +
        "<br> Your Answer :- " +
        QuesArray[x - 1].ua +
        " ( Correct ) <br><br>";
      document.getElementById("Que" + x).style.color = "green";
    } else {
      document.getElementById("Que" + x).innerHTML =
        x +
        ". " +
        QuesArray[x - 1].Que +
        "<br> Your Answer :- " +
        QuesArray[x - 1].ua +
        " <br> Correct Answer: " +
        QuesArray[x - 1].CrctAns +
        "<br><br>";
      document.getElementById("Que" + x).style.color = "red";
    }
    document.getElementById("TimeTaken").innerHTML =
      "Time Elapsed: " + TimePassed;
    document.getElementById("Score").innerHTML = "Score : " + score + " of 20";
  }
  document.getElementById("OutcomeBox").style.display = "none";
  document.getElementById("SummaryBox").style.display = "";
}
