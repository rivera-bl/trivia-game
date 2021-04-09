const QUESTIONS_AMOUNT = 5;
const BONUS_CORRECT = 100;

let questionCount = 0;

const httpClient = new HttpClient('https://opentdb.com');
const ui = new UI();
const game = new Game(BONUS_CORRECT);

const loaderElement = document.getElementById("loader");
const gameElement = document.getElementById("game");
const questionTitleElement = document.getElementById("question");
// Array.from because .getElementsByClassName returns a collection
const choicesElements = Array.from(document.getElementsByClassName("choice-text"));

const category = localStorage.getItem("category")

const startGame = async () => {
    const questions = await game.questionsLoad(QUESTIONS_AMOUNT, category);
    // console.log(questions)
    ui.loadCurrentQuestionAndChoices(questions);
    ui.toggleSpinner(gameElement, loaderElement);
}

startGame();
