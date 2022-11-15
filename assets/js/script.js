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
var questionsEl = document.querySelector("#questions");
var questionOneEl = document.querySelector("#one");
var questionTwoEl = document.querySelector("#two");
var questionThreeEl = document.querySelector("#three");
var questionFourEl = document.querySelector("#four");
var scoreKeeperEl = document.querySelector(".score-keeper");
var finalScoreEl = document.querySelector(".score-text");
var penaltyEl = document.querySelector(".penalty");
//////////////////////
// Random Variables //
//////////////////////
var questionNum = 0;
var score = 0;
var timeLeft = 180;
///////////
// Timer //
///////////
//Stops Timer
function stopTime(timeInterval) {
    clearInterval(timeInterval);
}

function penalty() {
    timeLeft = timeLeft - 10;
    penaltyEl.setAttribute("id", "visible");
}
//Sets the timer parameters.
function timer() {

    var timeInterval = setInterval(function() {
        if (timeLeft >= 1) {
            timeEl.textContent = 'Timer: ' + timeLeft + 's';
            timeLeft--;
        }
        else {
            timeEl.textContent = 'Game Over';
            end();
            stopTime(timeInterval);
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
    timeEl.textContent = "Timer: 180s";
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
    'In JavaScript, what element is used to store and manipulate text, usually in multiples?',
    'This is what you call the guide that defines coding conventions for all projects',
    'What tag is used to define a hyperlink, or link to another page?'
];
//Array of answers for option 1.
var optionOne = [
    'Conditional Loop',
    'Recorders',
    'Style Guide',
    '<p>'
];
//Array of answers for option 2.
var optionTwo = [
    'For Loop',
    'Strings',
    'Main Textbook',
    '<a>'
];
//Array of answers for option 3.
var optionThree = [
    'While Loop',
    'Arrays',
    'Coding Dictionary',
    '<link>'
];
//Array of answers for option 4.
var optionFour = [
    'Reg Loop',
    'Variables',
    'Developer`s Reference',
    '<section>'
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
    currentAnswer = correctAnswerList[questionNum];
    questionsEl.textContent = questions[questionNum];
    questionOneEl.textContent = optionOne[questionNum];
    questionTwoEl.textContent = optionTwo[questionNum];
    questionThreeEl.textContent = optionThree[questionNum];
    questionFourEl.textContent = optionFour[questionNum];
    if (questionNum < questions.length - 1) {
        questionNum++;
        console.log("Question #: " + questionNum);
        console.log("answer #: " + currentAnswer);
        return currentAnswer;
    }
    else if (questionNum === questions.length - 1) {
        nextEl.textContent = "Finish"
        questionNum++;
        console.log("Question #: " + questionNum);
        console.log("answer #: " + currentAnswer);
        return currentAnswer;
    }
    else if (questionNum >= questions.length) {
        end();
        timeEl.textContent = "Good Job!"
    }
    penaltyEl.textContent = '';
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
}
///////////////////////
// Score Submissions //
///////////////////////








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
submitEl.addEventListener("click", function() {
    toHighscores();
    //place initials and score in order of highest to lowest
    //store initials input
    //reset score
});
//Brings user to leaderboard on click.
viewHighscoreEl.addEventListener("click", function() {
    toHighscores();
});
//Returns user to the start menu on click.
returnEl.addEventListener("click", function() {
    menu();
});
//Populates the quiz with the next quesiton and disables the next button on click.
nextEl.addEventListener("click", function() {
    buttonReset();
    populateQuiz();
    nextEl.disabled = true;
});
//Clicking option one will turn it green if its the correct answer, red if it's incorrect. Re-enable next button, disable option buttons and increment score.
answerOneEl.addEventListener("click", function() {
    var selectedAnswer = 'one';
    console.log(selectedAnswer + currentAnswer);
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
    console.log(selectedAnswer);
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
    console.log(selectedAnswer);
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
    console.log(selectedAnswer);
    disableButtons();
    nextEl.disabled = false;
});

clearEl.addEventListener("click", function() {

});