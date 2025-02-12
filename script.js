const questions = [
    {
         question: "Q. What is 2 + 2?", 
         options: ["3", "4", "5", "6"], 
         answer: 1 
    },

    { 
        question: "Q. What is the capital of France?", 
        options: ["Berlin", "Madrid", "Paris", "Rome"], 
        answer: 2
    },

    {
         question: "Q. What is 5 * 3?", 
         options: ["15", "20", "10", "25"], 
         answer: 0 
    },
    {
         question: "Q. What is the largest ocean?", 
         options: ["Atlantic", "Indian", "Arctic", "Pacific"], 
         answer: 3
    },

    {
         question: "Q. Who wrote 'Hamlet'?", 
         options: ["Shakespeare", "Hemingway", "Austen", "Tolkien"], 
         answer: 0 
    }
];

let currentQuestion = 0, score = 0, timer;
const startBtn = document.querySelector("#start-btn");
const quizBox = document.querySelector("#quiz-box");
const questionEl = document.querySelector("#question");
const optionsEl = document.querySelector("#options");
const nextBtn = document.querySelector("#next-btn");
const submitBtn = document.querySelector("#submit-btn");
const progressEl = document.querySelector("#current");
const timeEl = document.querySelector("#time");
const resultPopup = document.querySelector("#result-popup");
const scoreEl = document.querySelector("#score");

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
submitBtn.addEventListener("click", showResult);

function startQuiz() {
    startBtn.style.display = "none";
    quizBox.style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    let timeLeft = 15;
    timeEl.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            disableOptions();
        }
    }, 1000);
    
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(index);
        optionsEl.appendChild(btn);
    });
    progressEl.textContent = currentQuestion + 1;
}

function checkAnswer(selectedIndex) {
    clearInterval(timer);
    const q = questions[currentQuestion];
    const buttons = optionsEl.children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add("disabled");
        if (i === q.answer) buttons[i].classList.add("correct");
        else if (i === selectedIndex) buttons[i].classList.add("wrong");
    }
    if (selectedIndex === q.answer) score++;
    nextBtn.style.display = "block";
}

function disableOptions() {
    const buttons = optionsEl.children;
    for (let btn of buttons) btn.classList.add("disabled");
    nextBtn.style.display = "block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        nextBtn.style.display = "none";
    } else {
        nextBtn.style.display = "none";
        submitBtn.style.display = "block";
    }
}

function showResult() {
    quizBox.style.display = "none";
    resultPopup.style.display = "block";
    scoreEl.textContent = score;
}