/////////////
// Buttons //
/////////////
var timeEl = document.querySelector("#timer-text");
var beginEl = document.querySelector("#begin-button");
var submitEl = document.querySelector(".submit-button");
var viewHighscoreEl = document.querySelector("#highscore-button");
var nextEl = document.querySelector(".next");
var clearEl = document.querySelector(".clear");
var returnEl = document.querySelector(".return");
var answerOneEl = document.querySelector("#one");
var answerTwoEl = document.querySelector("#two");
var answerThreeEl = document.querySelector("#three");
var answerFourEl = document.querySelector("#four");
/////////////
// Screens //
/////////////
var menuEl = document.querySelector(".start-menu");
var quizEl = document.querySelector(".quiz");
var gameOverEl  = document.querySelector(".game-over");
var highscoreEl = document.querySelector(".highscore-page");
///////////////////
// Text Elements //
///////////////////
var answerListEl = document.querySelector(".answers-list");
var questionNumberEl = document.querySelector(".questionNumber");
var questionsEl = document.querySelector("#questions");
var questionOneEl = document.querySelector("#one");
var questionTwoEl = document.querySelector("#two");
var questionThreeEl = document.querySelector("#three");
var questionFourEl = document.querySelector("#four");
var scoreKeeperEl = document.querySelector(".score-keeper");
var finalScoreEl = document.querySelector(".score-text");
var penaltyEl = document.querySelector(".penalty");
var initialsEl = document.querySelector(".initial-input");
var highscoresListEl = document.querySelector(".highscores");
//////////////////////
// Random Variables //
//////////////////////
var highscores = [];
var quizNumber = 0;
var questionNum = 0;
var score = 0;
var startTime = 90;
var timeLeft = startTime;
var timeInterval = null;
var initialSubmission = null;
var scoreListText = " Had a score of " + score + "!";
///////////
// Timer //
///////////
//Sets timer to whatever I set.
window.onload = function() {
        timeEl.textContent = "Timer: " + startTime + "s";
        submitEl.disabled = true;
    }
//Stops Timer.
function stopTime() {
    clearInterval(timeInterval);
    timeLeft = startTime;
}
//Applies a 10s penalty to the timer if a wrong answer is selected.
function penalty() {
    timeLeft = timeLeft - 10;
    penaltyEl.setAttribute("id", "visible");
}
//Sets the timer parameters.
function timer() {

    timeInterval = setInterval(function() {
        if (timeLeft >= 1) {
            timeEl.textContent = 'Timer: ' + timeLeft + 's';
            timeLeft--;
        }
        else {
            end();
            stopTime();
            resetEverything();
            timeEl.textContent = 'Game Over';
        }
    }, 1000);
    return timeLeft;
}
////////////////
// Navigation //
////////////////
//Brings user to start menu.
function menu() {
    menuEl.setAttribute("id", "display");
    quizEl.setAttribute("id", "hidden");
    gameOverEl.setAttribute("id", "hidden");
    highscoreEl.setAttribute("id", "hidden");
    timeEl.textContent = "Timer: " + startTime + "s";
}
//Starts the test and brings up question one.
function begin() {
    menuEl.setAttribute("id", "hidden");
    quizEl.setAttribute("id", "display");
    gameOverEl.setAttribute("id", "hidden");
    highscoreEl.setAttribute("id", "hidden");
}
//Ends test and goes to score submission.
function end() {
    menuEl.setAttribute("id", "hidden");
    quizEl.setAttribute("id", "hidden");
    gameOverEl.setAttribute("id", "display");
    highscoreEl.setAttribute("id", "hidden");
    questionNum = 0;
    score = 0;
}
//Brings user to high score board.
function toHighscores() {
    menuEl.setAttribute("id", "hidden");
    quizEl.setAttribute("id", "hidden");
    gameOverEl.setAttribute("id", "hidden");
    highscoreEl.setAttribute("id", "display");
}
////////////////////////////////
// Quiz Questions and Answers //
////////////////////////////////
//Array of questions.
var questions = [
    'What is the type of loop that continues through a block of code as long as the specified condition remains True?',
    'In JavaScript, what element is used to store and manipulate multiple points of data?',
    'What symbol is used to enclose an array?',
    'What tag is used to define a hyperlink, or link to another page?',
    'Every HTML page must include a reference to the external file sheet file inside the ___ element',
    'What is the CSS property that offers extra information about something when you hover over an element?',
    'What is the name given to the CSS element that always starts on a new-line and takes up the entire width available to it?',
    'In JavaScript, what element is used to store and manipulate text usually in multiples?',
    'What tag can be used to insert a line break or blank line in an HTML document?',
    'What tag is used to underline a word or line of text?'
];
//Array of answers for option 1.
var optionOne = [
    'Conditional Loop',
    'Recorders',
    '()',
    '<p>',
    'Header',
    'Tooltip',
    'Margin',
    'Variables',
    '<br>',
    '<s>'

];
//Array of answers for option 2.
var optionTwo = [
    'For Loop',
    'Strings',
    '{}',
    '<a>',
    'Body',
    'Tutorial',
    'Block-level',
    'Arrays',
    '<body>',
    '<ul>'
];
//Array of answers for option 3.
var optionThree = [
    'While Loop',
    'Arrays',
    '<>',
    '<link>',
    '<div>',
    'Hint',
    'Line',
    'Function',
    '<tab>',
    '<u>'
];
//Array of answers for option 4.
var optionFour = [
    'Reg Loop',
    'Variables',
    '[]',
    '<section>',
    '<link>',
    'Info Block',
    'spacer',
    'Strings',
    '<blank>',
    '<li>'
];
//Array of correct option choices.
var correctAnswerList = [
    'one',
    'three',
    'four',
    'two',
    'four',
    'one',
    'two',
    'four',
    'one',
    'three'
];
var currentAnswer = '';
//Pulls questions and answers from their respective arrays and populates the quiz. Also finds the correct answer.
function populateQuiz() {
    quizNumber = questionNum + 1;
    currentAnswer = correctAnswerList[questionNum];
    questionNumberEl.textContent = "Question #" + quizNumber;
    questionsEl.textContent = questions[questionNum];
    questionOneEl.textContent = optionOne[questionNum];
    questionTwoEl.textContent = optionTwo[questionNum];
    questionThreeEl.textContent = optionThree[questionNum];
    questionFourEl.textContent = optionFour[questionNum];
    if (questionNum < questions.length - 1) {
        questionNum++;
        penaltyEl.setAttribute("id", "invisible");
        return currentAnswer;
    }
    else if (questionNum === questions.length - 1) {
        nextEl.textContent = "Finish"
        questionNum++;
        penaltyEl.setAttribute("id", "invisible");
        return currentAnswer;
    }
    else if (questionNum >= questions.length) {
        end();
        timeEl.textContent = "Good Job!"
        penaltyEl.setAttribute("id", "invisible");
    }
    return currentAnswer;
}
//Prevents selecting multiple answers.
function disableButtons() {
    answerOneEl.disabled = true;
    answerTwoEl.disabled = true;
    answerThreeEl.disabled = true;
    answerFourEl.disabled = true;
}
//Resets button color, and enables them again.
function buttonReset() {
    answerOneEl.setAttribute("style", "background-color: #B9BAA3");
    answerTwoEl.setAttribute("style", "background-color: #B9BAA3");
    answerThreeEl.setAttribute("style", "background-color: #B9BAA3");
    answerFourEl.setAttribute("style", "background-color: #B9BAA3");
    answerOneEl.disabled = false;
    answerTwoEl.disabled = false;
    answerThreeEl.disabled = false;
    answerFourEl.disabled = false;
}
//Increments score and tallies it on quiz page.
function incrementScore() {
    score++;
    scoreKeeperEl.textContent = "Your Score: " + score;
    finalScoreEl.textContent = "Your final score is: " + score + "!";
    scoreListText = " Had a score of " + score + "!"
}
//Resets the score, and text that includes the score.
function resetEverything() {
    score = 0;
    buttonReset();
    quizNumber = 0;
    questionNum = 0;
    initialsEl.value = '';
    stopTime();
    submitEl.disabled = true;
    nextEl.textContent = "Next";
    scoreKeeperEl.textContent = "Your Score: " + score;
    finalScoreEl.textContent = "Your final score is: " + score + "!";
    scoreListText = " Had a score of " + score + "!";
    penaltyEl.setAttribute("id", "invisible");
    timeEl.textContent = "Timer: " + startTime + "s";
}
///////////////////////
// Score Submissions //
///////////////////////
//Unlocks submit button once text has been entered in initials element.
function unlockSubmit() {
    submitEl.disabled = false;
}
//Renders score submissions to the leaderboard.
function renderHighscores() {
    highscoresListEl.innerHTML = "";

    for (var i = 0; i < highscores.length; i++) {
        var highscore = highscores[i];

        var li = document.createElement("li");
        li.textContent = highscore;
        li.setAttribute("data-index", i);
        highscoresListEl.appendChild(li);
    }
}

function initHighscores() {
    var storedScores =JSON.parse(localStorage.getItem("highscores"));

    if (storedScores !== null) {
        highscores = storedScores;
    }
    renderHighscores();
}
//Stores the new score and initials in local storage
function storeScores() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
}
//Clears list items from highscore list, and data from local storage
function clearHighscores() {
    highscoresListEl.innerHTML = "";
    localStorage.clear();
}
//////////////////////
// Button Listeners //
//////////////////////
//Begins quiz on button click.
beginEl.addEventListener("click", function() {
    timer();
    begin();
    populateQuiz();
});
//Submits high score and moves page to leaderboard on click.
submitEl.addEventListener("click", function(event) {
    event.preventDefault();
    var highscoreText = initialsEl.value.trim() + scoreListText;
    if (highscoreText === "") {
        return;
    }
    highscores.push(highscoreText);
    storeScores();
    renderHighscores();
    toHighscores();
    resetEverything();
});
//Brings user to leaderboard on click.
viewHighscoreEl.addEventListener("click", function() {
    toHighscores();
    resetEverything();
});
//Returns user to the start menu on click.
returnEl.addEventListener("click", function() {
    menu();
    resetEverything();
});
//Populates the quiz with the next quesiton and disables the next button on click.
nextEl.addEventListener("click", function() {
    buttonReset();
    populateQuiz();
    //If on the last question, stop time when button is clicked, and change button back to "Next".
    if (quizNumber > questions.length) {
        stopTime();
        timeLeft = startTime;
        nextEl.textContent = "Next";
    }
    nextEl.disabled = true;
});
//Clicking option one will turn it green if its the correct answer, red if it's incorrect. Re-enable next button, disable option buttons and increment score.
answerOneEl.addEventListener("click", function() {
    var selectedAnswer = 'one';
    if (selectedAnswer != currentAnswer) {
        answerOneEl.setAttribute("style", "background-color: #A22C29");
        penalty();
    }
    else if (selectedAnswer == currentAnswer) {
        answerOneEl.setAttribute("style", "background-color: #49be25;");
        incrementScore();
    }
    disableButtons();
    nextEl.disabled = false;
});
//Clicking option two will turn it green if its the correct answer, red if it's incorrect. Re-enable next button, disable option buttons and increment score.
answerTwoEl.addEventListener("click", function() {
    var selectedAnswer = 'two';
    if (selectedAnswer != currentAnswer) {
        answerTwoEl.setAttribute("style", "background-color: #A22C29;");
        penalty();
    }
    else if (selectedAnswer == currentAnswer) {
        answerTwoEl.setAttribute("style", "background-color: #49be25;");
        incrementScore();
    }
    disableButtons();
    nextEl.disabled = false;
});
//Clicking option three will turn it green if its the correct answer, red if it's incorrect. Re-enable next button, disable option buttons and increment score.
answerThreeEl.addEventListener("click", function() {
    var selectedAnswer = 'three';
    if (selectedAnswer != currentAnswer) {
        answerThreeEl.setAttribute("style", "background-color: #A22C29;");
        penalty();
    }
    else if (selectedAnswer == currentAnswer) {
        answerThreeEl.setAttribute("style", "background-color: #49be25;");
        incrementScore();
    }
    disableButtons();
    nextEl.disabled = false;
});
//Clicking option four will turn it green if its the correct answer, red if it's incorrect. Re-enable next button, disable option buttons and increment score.
answerFourEl.addEventListener("click", function() {
    var selectedAnswer = 'four';
    if (selectedAnswer != currentAnswer) {
        answerFourEl.setAttribute("style", "background-color: #A22C29;");
        penalty();
    }
    else if (selectedAnswer == currentAnswer) {
        answerFourEl.setAttribute("style", "background-color: #49be25;");
        incrementScore();
    }
    disableButtons();
    nextEl.disabled = false;
});
//Clicking "Clear Highscores" will remove all highscores from list and local storage
clearEl.addEventListener("click", function() {
    clearHighscores();
});