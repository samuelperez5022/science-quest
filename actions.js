// SCIENCE QUEST - Game Logic

// 1. Game questions
const questions = [
    {
        question: "What is an ecosystem?",
        options: [
            "A group of animals",
            "A community of living and nonliving things",
            "A type of forest",
            "A group of plants"
        ],
        correct: 1
    },
    {
        question: "What is biodiversity?",
        options: [
            "The variety of life on Earth",
            "The amount of water in a river",
            "The number of rocks in an area",
            "The temperature of an ecosystem"
        ],
        correct: 0
    },
    {
        question: "Which of these is a producer?",
        options: [
            "Lion",
            "Snake",
            "Grass",
            "Eagle"
        ],
        correct: 2
    },
    {
        question: "What is the main role of decomposers?",
        options: [
            "Hunting other animals",
            "Breaking down dead organisms",
            "Producing sunlight",
            "Creating oxygen"
        ],
        correct: 1
    },
    {
        question: "Which ecosystem has very little rainfall?",
        options: [
            "Rainforest",
            "Wetland",
            "Desert",
            "Ocean"
        ],
        correct: 2
    },
    {
        question: "What is a food chain?",
        options: [
            "A sequence showing how energy moves between organisms",
            "A group of animals living together",
            "A type of habitat",
            "A natural water cycle"
        ],
        correct: 0
    },
    {
        question: "What is a habitat?",
        options: [
            "An animal's food",
            "The natural place where an organism lives",
            "A type of predator",
            "A group of ecosystems"
        ],
        correct: 1
    },
    {
        question: "Which of these is a consumer?",
        options: [
            "Grass",
            "Algae",
            "Rabbit",
            "Moss"
        ],
        correct: 2
    },
    {
        question: "What can cause biodiversity loss?",
        options: [
            "Habitat destruction",
            "Reforestation",
            "Conservation",
            "Planting trees"
        ],
        correct: 0
    },
    {
        question: "Why are ecosystems important?",
        options: [
            "They only provide food for humans",
            "They support life and maintain natural balance",
            "They eliminate all predators",
            "They prevent all natural disasters"
        ],
        correct: 1
    }
];

// 2. Game variables
let currentQuestion = 0;
let score = 0;
let answered = false;

// 3. HTML elements
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const startButton = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");

const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");

// 4. Start the game
function startGame() {
    currentQuestion = 0;
    score = 0;
    answered = false;

    startScreen.style.display = "none";
    endScreen.style.display = "none";
    gameScreen.style.display = "block";

    scoreElement.textContent = score;

    showQuestion();
}

// 5. Display a question
function showQuestion() {
    answered = false;

    nextButton.disabled = true;
    nextButton.style.display = "none";

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;
    answersElement.innerHTML = "";

    // Create the four answer buttons
    current.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("answer-btn");

        button.addEventListener("click", () => {
            selectAnswer(index, button);
        });

        answersElement.appendChild(button);
    });
}

// 6. Check the selected answer
function selectAnswer(selectedIndex, selectedButton) {
    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].correct;
    const answerButtons = answersElement.querySelectorAll("button");

    // Check if the answer is correct
    if (selectedIndex === correctAnswer) {
        score += 10;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("incorrect");
        answerButtons[correctAnswer].classList.add("correct");
    }

    // Update the score
    scoreElement.textContent = score;

    // Disable all answer buttons
    answerButtons.forEach(button => {
        button.disabled = true;
    });

    // Show the next question button
    nextButton.style.display = "block";
    nextButton.disabled = false;

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Finish Game";
    } else {
        nextButton.textContent = "Next Question";
    }
}

// 7. Move to the next question
function nextQuestion() {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

// 8. End the game
function endGame() {
    gameScreen.style.display = "none";
    endScreen.style.display = "block";

    finalScoreElement.textContent =
        score + " / " + (questions.length * 10);
}

// 9. Restart the game
function restartGame() {
    endScreen.style.display = "none";
    startScreen.style.display = "block";

    nextButton.textContent = "Next Question";
}

// 10. Connect buttons to game functions
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartGame);