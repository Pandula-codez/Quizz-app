let currentQuestion = 0;
let score = 0;
let selectedOption = "";
let timer;
let timeLeft = 15;

/* Shuffle Questions */
questions.sort(() => Math.random() - 0.5);

/* Elements */

const questionElement =
document.getElementById("question");

const optionsElement =
document.getElementById("options");

const nextBtn =
document.getElementById("nextBtn");

const restartBtn =
document.getElementById("restartBtn");

const timerElement =
document.getElementById("timer");

const resultElement =
document.getElementById("result");

const progress =
document.getElementById("progress");

const scoreDisplay =
document.getElementById("scoreDisplay");

const highScoreElement =
document.getElementById("highScore");

/* Load Question */

function loadQuestion(){

    resetTimer();

    const q = questions[currentQuestion];

    questionElement.innerText = q.question;

    optionsElement.innerHTML = "";

    q.options.forEach(option => {

        const btn =
        document.createElement("button");

        btn.innerText = option;

        btn.classList.add("option");

        btn.onclick = () => selectAnswer(btn, option);

        optionsElement.appendChild(btn);
    });

    updateProgress();
}

/* Select Answer */

function selectAnswer(button, option){

    selectedOption = option;

    const buttons =
    document.querySelectorAll(".option");

    buttons.forEach(btn => {

        btn.disabled = true;

        if(btn.innerText ===
           questions[currentQuestion].answer){

            btn.classList.add("correct");
        }

        if(btn.innerText === option &&
           option !== questions[currentQuestion].answer){

            btn.classList.add("wrong");
        }
    });
}

/* Next Question */

nextBtn.onclick = () => {

    if(selectedOption ===
       questions[currentQuestion].answer){

        score++;
    }

    scoreDisplay.innerText =
    `Score: ${score}`;

    currentQuestion++;

    selectedOption = "";

    if(currentQuestion < questions.length){

        loadQuestion();

    } else {

        showResult();
    }
};

/* Result */

function showResult(){

    clearInterval(timer);

    questionElement.innerText =
    "Quiz Completed";

    optionsElement.innerHTML = "";

    nextBtn.style.display = "none";

    restartBtn.style.display = "block";

    resultElement.innerHTML =
    `Your Score: ${score}/${questions.length}`;

    /* High Score */

    let highScore =
    localStorage.getItem("highScore") || 0;

    if(score > highScore){

        localStorage.setItem("highScore", score);

        highScore = score;
    }

    highScoreElement.innerHTML =
    `High Score: ${highScore}`;
}

/* Restart Quiz */

restartBtn.onclick = () => {

    currentQuestion = 0;

    score = 0;

    selectedOption = "";

    questions.sort(() => Math.random() - 0.5);

    scoreDisplay.innerText = "Score: 0";

    resultElement.innerHTML = "";

    restartBtn.style.display = "none";

    nextBtn.style.display = "block";

    loadQuestion();
};

/* Timer */

function startTimer(){

    timer = setInterval(() => {

        timeLeft--;

        timerElement.innerText =
        `Time: ${timeLeft}`;

        if(timeLeft <= 0){

            clearInterval(timer);

            currentQuestion++;

            if(currentQuestion < questions.length){

                loadQuestion();

            } else {

                showResult();
            }
        }

    }, 1000);
}

/* Reset Timer */

function resetTimer(){

    clearInterval(timer);

    timeLeft = 15;

    timerElement.innerText =
    `Time: ${timeLeft}`;

    startTimer();
}

/* Progress Bar */

function updateProgress(){

    const progressPercent =
    ((currentQuestion) / questions.length) * 100;

    progress.style.width =
    progressPercent + "%";
}

/* Start App */

loadQuestion();