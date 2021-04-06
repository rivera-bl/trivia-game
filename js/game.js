const question = document.getElementById("question");
// Array.from because .getElementsByClassName returns a collection
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterElement = document.getElementById("question-counter");
const scoreElement = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    // change page if there is no questions lefts
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("Score", score);
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
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
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
        // saves the <p data-number> of the selected choice
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        // compares the number of the choice with the number in the questions.answer
        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
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

startGame();
