const QUESTIONS_AMOUNT = 5;
const BONUS_CORRECT = 100;

let questionCount = 0;

const httpClient = new HttpClient('https://opentdb.com');
const ui = new UI();
const game = new Game(BONUS_CORRECT);

const selectElement = document.getElementById('category');
ui.loadCategories(selectElement);

const playBtn = document.getElementById("play");
playBtn.addEventListener('click', (e) => {
    const category = document.getElementById('category').value;

    game.questionsLoad(QUESTIONS_AMOUNT, category);
});

