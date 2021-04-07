const question = document.getElementById("question");
// Array.from because .getElementsByClassName returns a collection
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterElement = document.getElementById("question-counter");
const scoreElement = document.getElementById("score");
const loaderElement = document.getElementById("loader");
const gameElement = document.getElementById("game");

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;

let questions = [];
let availableQuestions = [];
let currentQuestion = {};

let domainAPI = 'https://opentdb.com/api.php?'

// fetch the trivia api, format the results and save them in the questions array
fetchTrivia = async () => {
    const res = await fetch(`${domainAPI}amount=10&difficulty=easy&type=multiple`);
    const resultsArray = await res.json();

    // TODO solve this mess with replacing special chars in the response
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

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    // hides the spinner and show the game container
    gameElement.classList.remove("hidden");
    loaderElement.classList.add("hidden");
};

getNewQuestion = () => {
    // change page if there is no questions lefts
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("/end.html");
    }

    questionCounter++;
    questionCounterElement.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    // randomly gets a number between 0 and the ammount of questions
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    // fills the <h1> element with the question @ the randomly generated index
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    
    // fills the <p> elements with the choices of the currentQuestion
    choices.forEach((choice, index) => {
        choice.innerText = currentQuestion.choices[index];
    });

    // after loading the question its deleted it from the array
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach( choice => {
    choice.addEventListener('click', e => {
        // lets the questions loads before accepting clicks
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        // saves the innerText of the selected <p> tag
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.innerText;

        // compares the selectedAnswer with the correctAnswer and determines a class
        const classToApply = 
            selectedAnswer == currentQuestion.correctAnswer ? "correct" : "incorrect";
        
        // increments the score and updates the <p score> element
        if(classToApply == 'correct'){
            score += CORRECT_BONUS;
            scoreElement.innerText = score;
        };

        // the class applies green/red to the choice depending if it's correct or not
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            // deletes the class so it doesn't stack in the next question
            selectedChoice.parentElement.classList.remove(classToApply);

            // gets a new question after a choice is clicked
            getNewQuestion();
        }, 500)
    });
});

fetchTrivia();
