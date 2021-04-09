class Game {

    constructor(bonusCorrect){
        this.bonusCorrect = bonusCorrect;
    }

    // METHODS:
    // spinnerToggle
    // startGame
    // questionNext

    async questionsLoad(questionsAmount, category=""){
        questionsAmount = `amount=${questionsAmount}`;
        category = `category=${category}`;

        const query = `${questionsAmount}&${category}&type=multiple`;

        let questions = await httpClient.get(`/api.php?${query}`);
        questions = await ui.formatQuestions(questions)

        return questions;
    }

    // questionNext(){
    //     if(questionCount == questionsAmount){
    //         return window.location.assign("/end.html");
    //     }
    // }
}
