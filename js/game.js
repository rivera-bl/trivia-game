const questionElement = document.getElementById("question");
// Array.from because .getElementsByClassName returns a collection
const choicesElements = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterElement = document.getElementById("question-counter");
const scoreElement = document.getElementById("score");
const loaderElement = document.getElementById("loader");
const gameElement = document.getElementById("game");

const CORRECT_BONUS = 10;

let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;

let questions = [];
let currentQuestion = {};

const domainAPI = 'https://opentdb.com/api.php?'

const startGame = () => {
    questionCounter = 0;
    score = 0;
    getNewQuestion();
    toggleSpinner();
};

// fills the game container with the question title, choices and counter
const getNewQuestion = () => {
    if(questionCounter == 10){
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("/end.html");
    }
    currentQuestion = questions[questionCounter];
    questionElement.innerText = currentQuestion.question;
    
    choicesElements.forEach((choice, index) => {
        choice.innerText = currentQuestion.choices[index];
    });

    questionCounter++;
    questionCounterElement.innerText = `${questionCounter}/${questions.length}`;
    acceptingAnswers = true;
};

choicesElements.forEach( choice => {
    choice.addEventListener('click', (e) => {
        clickChoice(e);
    })
});

// determines if the selection was correct and gives red or green feedback
const clickChoice = (e) => {
    // lets the questions loads before accepting clicks
    if(!acceptingAnswers) return;

    const selectedChoice = e.target;
    const classToApply = 
        selectedChoice.innerText == 
            currentQuestion.correctAnswer ? "correct" : "incorrect";
    
    incrementScore(CORRECT_BONUS, classToApply);
    selectedChoice.parentElement.classList.add(classToApply);
    acceptingAnswers = false;

    setTimeout( () => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
    }, 500)
};

// hides the spinner and shows the game container
const toggleSpinner = () => {
    gameElement.classList.remove("hidden");
    loaderElement.classList.add("hidden");
}

// increments the score if the answer is correct
const incrementScore = (bonus, answer) => {
    if(answer == 'correct'){
        score += bonus;
        scoreElement.innerText = score;
    };
}

// fetch the trivia api, format the results and save them in the questions array
const fetchTrivia = async () => {
    const res = await fetch(`${domainAPI}amount=10&difficulty=easy&type=multiple`);
    const resultsArray = await res.json();

    // TODO solve this unreadable mess with replacing special chars in the response
    // it's also missing &eacute;
    questions = resultsArray.results.map(result => {

        result.incorrect_answers.forEach((choice, index) => {
            result.incorrect_answers[index] = choice.replace(/(&#039\;)/g,"\'").replace(/(&quot\;)/g,"\"").replace(/&amp;/g, '&');
        })

        result.correct_answer = result.correct_answer.replace(/(&#039\;)/g,"\'").replace(/(&quot\;)/g,"\"").replace(/&amp;/g, '&');

        // format the results
        const formattedResult = {
            question: result.question.replace(/(&#039\;)/g,"\'").replace(/(&quot\;)/g,"\"").replace(/&amp;/g, '&'),
            choices: [...result.incorrect_answers],
            correctAnswer: result.correct_answer
        };

        formattedResult.choices.push(result.correct_answer);
        // randomize the items location inside the choices array
        formattedResult.choices.sort(() => Math.random() - 0.5);
        return formattedResult;
    });
    startGame();
};

fetchTrivia();
