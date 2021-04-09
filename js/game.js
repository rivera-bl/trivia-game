const QUESTIONS_AMOUNT = 5;
const BONUS_CORRECT = 100;

let questionCount = 0;
let score = 0
let acceptingAnswers = false;

const httpClient = new HttpClient('https://opentdb.com');
const ui = new UI();
const game = new Game(BONUS_CORRECT);

const loaderElement = document.getElementById("loader");
const gameElement = document.getElementById("game");
const questionTitleElement = document.getElementById("question");
const choicesElements = Array.from(document.getElementsByClassName("choice-text"));
const scoreElement = document.getElementById("score");
const questionCounterElement = document.getElementById("question-counter");

const category = localStorage.getItem("category")

startGame = async () => {
    const questions = await game.questionsLoad(QUESTIONS_AMOUNT, category);
    ui.toggleSpinner(gameElement, loaderElement);

    if(questionCount == 0){
        ui.loadCurrentQuestionAndChoices(questions[questionCount]);
        ui.updateHUD(questions);
    }

    choicesElements.forEach( choice => {
        choice.addEventListener('click', (e) => {
            if(!acceptingAnswers) return;

            const choiceEvaluated = game.choiceEvaluate(e, questions[questionCount])
            ui.feedbackChoiceEvaluated(e, choiceEvaluated);
            questionCount++;

            setTimeout( () => {
                if(questionCount == QUESTIONS_AMOUNT){
                    localStorage.setItem("mostRecentScore", score);
                    return window.location.assign("/end.html");
                }

                ui.feedbackRemove(e, choiceEvaluated);
                ui.loadCurrentQuestionAndChoices(questions[questionCount]);
                ui.updateHUD(questions);

            }, 500)
        })
    });
}

startGame();
